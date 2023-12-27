const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'Notification',
  new Schema({
    observerId: {
      type: Number,
      required: true,
    },
    ruleId: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    method: {
      required: true,
      type: String,
      enum: ['telegram', 'email'],
    },
  })
);
