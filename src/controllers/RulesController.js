const { ObjectId } = require("bson");
const { Rule, Metric } = require("../models");
const { RequestHandler } = require("express");

function checkCondition(value, condition, value2){
    if (condition === 'bigger') {
        if (value > value2) {
            return true;
        } else {
            return false;
        }
    } else if (condition === 'equals') {
        if (value === value2) {
            return true;
        } else {
            return false;
        }
    } else if (condition === 'smaller') {
        if (value < value2) {
            return true;
        } else {
            return false;
        }
    }
    return null;
}

module.exports = {
	/**@type {RequestHandler} */
	getRules: async (req, res) => {
		const result = await Rule.find({});
		res.status(200);
		res.send(result);
	},
	/**@type {RequestHandler} */
	getRuleById: async (req, res) => {
		const id = req.params.id;
		if (id.length !== 24) {
			res.status(400);
			res.json({
				message: "Bad ID",
			});
		} else {
			const result = await Rule.findById(id);
			if (result === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(result);
		}
	},
    getBad: async (req, res) => {
        const rules = await Rule.find({});
        const bad = [];
		for (let rule of rules) {
			const metric = await Metric.findById(rule.metricId);
			if (metric) {
				const value = metric.type === 'percent' ? metric.value / 100 : metric.value;
				if (checkCondition(value, rule.condition, rule.controlValue)) {
					bad.push(rule);
				}
			}
		}
        res.status(200);
        res.send(bad);
    },
	/**@type {RequestHandler} */
	addRules: async (req, res) => {
		const body = req.body;
		if (!Array.isArray(body)) {
			res.status(400);
			res.json({
				message: "Bad request body. Array expected",
			});
		} else {
			try {
				const result = await Rule.insertMany(body);
				res.status(201);
				res.send(result);
			} catch (error) {
				res.status(400);
				res.json({
					message: "Bad request body.",
				});
			}
		}
	},
	/**@type {RequestHandler} */
	deleteRuleById: async (req, res) => {
		const id = req.params.id;
		if (id.length !== 24) {
			res.status(400);
			res.json({
				message: "Bad ID",
			});
		} else {
			const result = await Rule.findByIdAndDelete(id);
			if (result === null) {
				res.status(404);
			} else {
				res.status(200);
			}
			res.send(result);
		}
	},
	/**@type {RequestHandler} */
	updateRuleById: async (req, res) => {
		const id = req.params.id;
		const body = req.body;
		if (id.length !== 24) {
			res.status(400);
			res.json({
				message: "Bad ID",
			});
		} else {
			try {
				const result = await Rule.findOneAndUpdate({ _id: new ObjectId(id) }, body, {
					new: true
				});
				if (result === null) {
					res.status(404);
				} else {
					res.status(200);
				}
				res.send(result);
			} catch (error) {
				res.status(400);
				res.json({
					message: "Bad request body.",
				});
			}
		}
	},
};