const express = require('express');
const router = express.Router();
const { MetricsController } = require('../controllers');

router
  .route('/')
  .get(MetricsController.getMetrics)
  .post(MetricsController.addMetrics);
router
  .route('/:id')
  .get(MetricsController.getMetricById)
  .delete(MetricsController.deleteMetricById)
  .put(MetricsController.updateMetricById);

module.exports = router;
