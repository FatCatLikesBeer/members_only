const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/users.js');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Passport.js local login 'strategy' //
// I'm not sure how this is working sitewide but whatever //
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);
// The method below creates a user cookie which
// allows them to stay logged in.
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// The method below checks the cookie?
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

// Sign up GET //
exports.signup_get = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup', {
      title: 'Members Only',
      user: req.user,
    });
  }
};

// Sign up POST //
exports.signup_post = [
  // Validating form fields
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({ min: 8 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    try {
      const [
        username,
        email,
        password
      ] = [
          req.body.username,
          req.body.email,
          req.body.password,
        ];

      // Check for email or username collission.
      const existingEmail = await User.findOne({ email: email }).exec();
      const existingUser = await User.findOne({ username: username }).exec();
      if (existingUser) {
        return res.status(400).json({ message: "An account with this email aready exists."});
      }
      if (existingEmail) {
        return res.status(400).json({ message: "An account with this username aready exists."});
      }

      // Try to hash password first, then create a new user.
      try {
        bcrypt.hash(req.body.password, 16, async(err, hashedPassword) => {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
          });
          const result = await user.save();
          res.redirect("/");
        })
      } catch(err) {
        return next(err);
      };
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
];
