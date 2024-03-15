const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require("passport");

// Sign up GET //
router.get('/', asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Members Only',
      user: req.user,
    });
  }
}));

// Sign up POST //
router.post('/', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/fail",
}));

module.exports = router;
