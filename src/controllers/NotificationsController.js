const { ObjectId } = require('bson');
const { Notification } = require('../models');
const { RequestHandler } = require('express');

/**
 * @typedef NotificationDTOJSON
 * @property {number} observerId
 * @property {number} ruleId
 * @property {string} message
 * @property {Date} date
 * @property {'email' | 'telegram'} method
 */

class NotificationDTO {
  constructor(observerId, ruleId, message, date, method) {
    this.observerId = observerId;
    this.ruleId = ruleId;
    this.message = message;
    this.date = date;
    this.method = method;
  }
  /**
   * @param {NotificationDTOJSON} json
   */
  static fromJSON(json) {
    return new NotificationDTO(
      json.observerId,
      json.ruleId,
      json.message,
      json.date,
      json.method
    );
  }
  /**
   * @return {NotificationDTOJSON}
   */
  toJSON() {
    return {
      observerId: this.observerId,
      ruleId: this.ruleId,
      message: this.message,
      date: this.date,
      method: this.method,
    };
  }
}

module.exports = {
  /**@type {RequestHandler} */
  getNotifications: async (req, res) => {
    const result = await Notification.find({});
    res.status(200);
    res.send(result);
  },
  /**@type {RequestHandler} */
  getNotificationById: async (req, res) => {
    const id = req.params.id;
    if (id.length !== 24) {
      res.status(400);
      res.json({
        message: 'Bad ID',
      });
    } else {
      const result = await Notification.findById(id);
      if (result === null) {
        res.status(404);
      } else {
        res.status(200);
      }
      res.send(result);
    }
  },
  /**@type {RequestHandler} */
  findNotificationsByRuleId: async (req, res) => {
    const id = req.query.id;
    const result = await Notification.find({ ruleId: id });
    if (result.length === 0) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.send(result);
  },
  /**@type {RequestHandler} */
  findNotificationsByObserverId: async (req, res) => {
    const id = req.query.id;
    const result = await Notification.find({ observerId: id });
    if (result.length === 0) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.send(result);
  },
  /**@type {RequestHandler} */
  addNotifications: async (req, res) => {
    const body = req.body;
    if (!Array.isArray(body)) {
      res.status(400);
      res.json({
        message: 'Bad request body. Array expected',
      });
    } else {
      /**@type {NotificationDTO[]} */
      const notifications = [];
      body.forEach((notification) => {
        notifications.push(NotificationDTO.fromJSON(notification));
      });
      try {
        const result = await Notification.insertMany(
          notifications.map((notification) => notification.toJSON())
        );
        res.status(201);
        res.send(result);
      } catch (error) {
        res.status(400);
        console.log(error);
        res.json({
          message: 'Bad request body.',
        });
      }
    }
  },
  /**@type {RequestHandler} */
  deleteNotificationById: async (req, res) => {
    const id = req.params.id;
    if (id.length !== 24) {
      res.status(400);
      res.json({
        message: 'Bad ID',
      });
    } else {
      const result = await Notification.findByIdAndDelete(id);
      if (result === null) {
        res.status(404);
      } else {
        res.status(200);
      }
      res.send(result);
    }
  },
};
