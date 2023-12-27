const express = require('express');
const router = express.Router();
const metricsRoutes = require('./metrics');
const notificationsRoutes = require('./notifications');
const rulesRoutes = require('./rules');

router.use('/metrics', metricsRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/rules', rulesRoutes);

module.exports = router;
