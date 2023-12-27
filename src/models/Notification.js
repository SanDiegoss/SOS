const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'Notification',
  new Schema({
    observerId: {
      type: String,
      required: true,
    },
    ruleId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    method: {
      required: true,
      type: String,
      enum: ['telegram', 'email'],
    },
  })
);
