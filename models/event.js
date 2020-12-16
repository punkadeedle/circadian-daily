var mongoose = require("mongoose")

var eventSchema = new mongoose.Schema({
	title: String,
	category: String,
	allDayInd: String,
	startDate: Date,
	endDate: Date,
  startTime: String,
  endTime: String,
	status: String,
	description: String,
	priority: String,
	location: String,
  owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Event", eventSchema);
