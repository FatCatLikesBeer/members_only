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
    res.send(req.body)
  }),
];
