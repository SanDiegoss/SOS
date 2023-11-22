const express = require("express");
const router = express.Router();
const metricsRoutes = require("./metrics");
const notificationsRoutes = require("./notifications");

router.use("/metrics", metricsRoutes);
router.use("/notifications", notificationsRoutes);

module.exports = router;
