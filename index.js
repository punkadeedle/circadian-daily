require('dotenv').config()

var express     = require("express"),
    app         = express(),
    path			  = require("path"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride 	= require("method-override"),
    passport		= require("passport"),
    LocalStrategy 	= require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash 			= require("connect-flash"),
    User 			  = require("./models/user"),
    Event       = require("./models/event")

  app.use(bodyParser.urlencoded({extended:true}));
  app.set("view engine", "ejs");
  app.set('views', path.join(__dirname, 'views'));

  //serve public directory
  app.use(express.static(__dirname + "/public"));
  app.use(methodOverride("_method"));
  app.use(flash());

var indexRoutes 	= require("./routes/index"),
    userRoutes 		= require("./routes/users"),
    eventRoutes 		= require("./routes/events");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL_PROD);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//begin db open
db.once('open', function() {

app.use(require("express-session")({
  secret: "Test secret key is test",
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


  app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
  });


  app.use("/", indexRoutes);
  app.use("/users", userRoutes);
  app.use("/events", eventRoutes);

}); // end db open


// ------------------------
// Server listening
// ------------------------
app.listen(process.env.PORT, process.env.IP, function() {
  //console.log("Server started");
});
