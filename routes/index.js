var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var middleware = require("../middleware");
//var request = require('request');


router.get("/", function(req, res){
	// landing page
	var querystring;
	//check for logged in user
	if(req.isAuthenticated()){
		querystring = req.user.username;
	}
	//get all events for logged in user
	Event.find({$query:{"owner.username":querystring}, $orderby:{ startTime : 1 }}, function(err, events) {
		if(err) {
			console.log(err);
		} else {
			res.render("landing", {events:events});
		}
	}).sort( { startTime: 1 });
});

// ------------------------
// AUTH ROUTES
// ------------------------

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var role = "User";
	User.register(new User({username:req.body.username, firstName:req.body.firstName, lastName:req.body.lastName, role:role}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Circadian, " + user.username);
			res.redirect("/");
		});
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}), function(req, res){
	//nothing needed in callback
});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success","You have been logged out.");
	res.redirect("/");
});


module.exports = router;
