var mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	role: String,
	email: String,
	zipcode: String,
	events: [{ type: mongoose.Types.ObjectId, ref: 'Event' }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
