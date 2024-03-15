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

// Sign up GET //
exports.signup_get = (req, res, next) => {
  res.render('signup', { title: "Members Only" });
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
      ]

      // Check for email or username collissions
      const existingEmail = await User.findOne({ email: email }).exec();
      const existingUser = await User.findOne({ username: username }).exec();
      if (existingUser) {
        return res.status(400).json({ message: "An account with this email aready exists."});
      }
      if (existingEmail) {
        return res.status(400).json({ message: "An account with this username aready exists."});
      }

      // Create a new user
      res.send(username + email + password);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
];
