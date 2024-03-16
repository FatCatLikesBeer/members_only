const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.render('post_form', {
    user: req.user,
  });
}));

module.exports = router;
