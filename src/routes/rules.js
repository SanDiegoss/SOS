const express = require("express");
const router = express.Router();
const { RulesController } = require("../controllers");

router
	.route("/bad")
	.get(RulesController.getBad);

router
	.route("/")
	.get(RulesController.getRules)
	.post(RulesController.addRules);
router
	.route("/:id")
	.get(RulesController.getRuleById)
	.delete(RulesController.deleteRuleById)
	.put(RulesController.updateRuleById);

module.exports = router;
