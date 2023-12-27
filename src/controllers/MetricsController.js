const { ObjectId } = require('bson');
const { Metric } = require('../models');
const { RequestHandler } = require('express');

/**
 * @typedef MetricDTOJSON
 * @property {string} name
 * @property {number} value
 * @property {'default' | 'percent'} type
 */

class MetricDTO {
  constructor(name, value, type) {
    this.name = name;
    this.value = value;
    this.type = type;
  }
  /**
   * @param {MetricDTOJSON} json
   */
  static fromJSON(json) {
    return new MetricDTO(json.name, json.value, json.type);
  }
  /**
   * @return {MetricDTOJSON}
   */
  toJSON() {
    return {
      name: this.name,
      value: this.value,
      type: this.type,
    };
  }
}

module.exports = {
  /**@type {RequestHandler} */
  getMetrics: async (req, res) => {
    const result = await Metric.find({});
    res.status(200);
    res.send(result);
  },
  /**@type {RequestHandler} */
  getMetricById: async (req, res) => {
    const id = req.params.id;
    if (id.length !== 24) {
      res.status(400);
      res.json({
        message: 'Bad ID',
      });
    } else {
      const result = await Metric.findById(id);
      if (result === null) {
        res.status(404);
      } else {
        res.status(200);
      }
      res.send(result);
    }
  },
  /**@type {RequestHandler} */
  addMetrics: async (req, res) => {
    const body = req.body;
    if (!Array.isArray(body)) {
      res.status(400);
      res.json({
        message: 'Bad request body. Array expected',
      });
    } else {
      /**@type {MetricDTO[]} */
      const metrics = [];
      body.forEach((metric) => {
        metrics.push(MetricDTO.fromJSON(metric));
      });
      try {
        const result = await Metric.insertMany(
          metrics.map((metric) => metric.toJSON())
        );
        res.status(201);
        res.send(result);
      } catch (error) {
        res.status(400);
        res.json({
          message: 'Bad request body.',
        });
      }
    }
  },
  /**@type {RequestHandler} */
  deleteMetricById: async (req, res) => {
    const id = req.params.id;
    if (id.length !== 24) {
      res.status(400);
      res.json({
        message: 'Bad ID',
      });
    } else {
      const result = await Metric.findByIdAndDelete(id);
      if (result === null) {
        res.status(404);
      } else {
        res.status(200);
      }
      res.send(result);
    }
  },
  /**@type {RequestHandler} */
  updateMetricById: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (id.length !== 24) {
      res.status(400);
      res.json({
        message: 'Bad ID',
      });
    } else {
      try {
        const result = await Metric.findOneAndUpdate(
          { _id: new ObjectId(id) },
          body,
          {
            new: true,
          }
        );
        if (result === null) {
          res.status(404);
        } else {
          res.status(200);
        }
        res.send(result);
      } catch (error) {
        res.status(400);
        res.json({
          message: 'Bad request body.',
        });
      }
    }
  },
};
