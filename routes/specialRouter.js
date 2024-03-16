const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/users.js');

router.get('/', asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('special_form', {
      user: req.user,
    });
  } else {
    res.redirect('/');
  }
}));

router.post('/', asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.body.upgrade == "UpgradeMePlease42069") {
      const user = new User({
        username: req.user.username,
        password: req.user.password,
        email: req.user.email,
        creationDate: req.user.creationDate,
        class: "Administrator",
        _id: req.user._id,
      });
      await User.findByIdAndUpdate(req.user._id, user, {});
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
}));

module.exports = router;
