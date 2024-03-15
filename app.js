var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

//// ------ Login Stuff ------ ////
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//// ------ Routes ------ ////
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login.js');

//// ------ MongoDB Stuff ------ ////
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDb connection error"));

//// ------ Instantiate Our App ------ ////
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// I think this is for cookies
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// This is for authentication.
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//// ------ I'm not sure what this stuff does ------ ////
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to pass 'currentUser' into all views.
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//// ------ Routes ------ ////
app.use('/', indexRouter);
app.post('/', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
}));
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.get('/test', (req, res) => {
  console.log(req);
});
app.post('/log-in', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
}));
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
