const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types

module.exports = mongoose.model(
	"Rule",
	new Schema({
		metricId: {
			type: String,
			required: true,
		},
		condition: {
            type: String,
			required: true,
            enum: ["bigger", "smaller", "equals"],
        },
		controlValue: {
			required: true,
			type: Number,
		},
	})
);
