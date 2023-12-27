const express = require('express');
const router = express.Router();
const { NotificationsController } = require('../controllers');

router
  .route('/')
  .get(NotificationsController.getNotifications)
  .post(NotificationsController.addNotifications);
router
  .route('/byObserverId')
  .get(NotificationsController.findNotificationsByObserverId);
router
  .route('/byRuleId')
  .get(NotificationsController.findNotificationsByRuleId);
router
  .route('/:id')
  .get(NotificationsController.getNotificationById)
  .delete(NotificationsController.deleteNotificationById);

module.exports = router;
