const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'Metric',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['default', 'percent'],
      default: 'default',
      required: false,
    },
  })
);
