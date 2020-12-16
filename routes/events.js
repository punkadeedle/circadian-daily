var express = require("express");
var router = express.Router();
var Event = require("../models/event");
var middleware = require("../middleware");

// ------------------------
// Event ROUTES
// ------------------------

// //Index - GET all instances
// router.get("/", function(req, res){
//     Event.find({}, function(err, allEvents){
//      if(err){
//        console.log(err);
//      } else {
//       res.redirect("/");
//     }
//
//   })
// });
//
// //New - GET form to create new instance
// router.get("/new", function(req, res){
//     res.render("events/new");
// });

//Create - POST new instance on form submit
router.post("/", function(req, res){
  var title = req.body.currentEvent.title;
  var allDayInd = req.body.currentEvent.allDayInd;
  var startDate = req.body.currentEvent.startDate;
  var startTime = req.body.currentEvent.startTime;
  var endDate = req.body.currentEvent.endDate;
  var endTime = req.body.currentEvent.endTime;
  var description = req.body.currentEvent.description;
  var location = req.body.currentEvent.location;
  var owner = {
    id: req.user._id,
    username: req.user.username
  }
  var newEvent = {title:title, allDayInd:allDayInd, startDate:startDate,
    startTime:startTime, endDate:endDate, endTime:endTime, description:description,
    location:location, owner:owner};
    Event.create(newEvent, function(err, createdEvent){
      if(err){
        console.log(err);
      } else {
        //console.log(createdEvent);
        res.redirect("../");
      }
    });
  });

  // //Show - GET one instance
  // router.get("/:id/", function(req, res) {
  //   Event.findById(req.params.id).exec(function(err, foundEvent){
  //     if(err){
  //       console.log(err);
  //     } else {
  //       console.log(foundEvent)
  //       //render show template
  //       res.redirect("../", {currentEvent: foundEvent});
  //     }
  //   });
  // });

  // //Edit - GET form to edit one instance
  // router.get("/:id/edit", function(req, res) {
  //   Event.findById(req.params.id, function(err, foundEvent){
  //     res.render("events/edit", {currentEvent: foundEvent});patch
  //   });
  // });

  //Update - PUT/PATCH edit instance on form submit
  router.patch("/:id", function(req, res) {
    // var title = req.body.currentEvent.title;
    // var allDayInd = req.body.currentEvent.allDayInd;
    // var startDate = req.body.currentEvent.startDate;
    // var startTime = req.body.currentEvent.startTime;
    // var endDate = req.body.currentEvent.endDate;
    // var endTime = req.body.currentEvent.endTime;
    // var description = req.body.currentEvent.description;
    // var location = req.body.currentEvent.location;
    // var editEvent = {title:title, allDayInd:allDayInd, startDate:startDate,
    //   startTime:startTime, endDate:endDate, endTime:endTime, description:description,
    //   location:location};
    // find and update the correct instance
    Event.findByIdAndUpdate(req.params.id, req.body.currentEvent, function(err, updatedEvent){
      if(err){
        res.redirect("/");
      } else {
        //redirect somewhere(show page)
        console.log(updatedEvent)
        res.redirect("/");
      }
    });

  });

  //Destroy - DELETE one instance
  router.delete("/:id", function(req, res){
    Event.findByIdAndRemove(req.params.id, function(err){
      if(err){
        res.redirect("/");
      } else {
        res.redirect("/");
      }
    });
  });

  router.get("/*", function(req, res){
  	req.flash("error","Page not found.");
  	res.redirect("/");
  });

  module.exports = router;
