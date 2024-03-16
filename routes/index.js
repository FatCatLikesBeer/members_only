const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().populate("user").sort({ timeStamp: -1 }).exec();
  let auth;
  let admin = false;
  if (req.user != undefined) {
    if (req.user.class == "Administrator") {
      admin = true;
    }
  }
  if (req.isAuthenticated()) {
    auth = true;
  } else {
    auth = false;
  }
  res.render('index', {
    user: req.user,
    posts: allPosts,
    auth: auth,
    admin: admin,
  });
}));

/* GET post page */
router.get('/post', asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('post_form', {
      user: req.user,
    });
  } else {
    res.redirect('/');
  }
}));

/* POST Post page */
router.post('/post', asyncHandler(async (req, res, next) => {
  const newPost = new Post({
    user: req.user,
    title: req.body.title,
    type: req.body.type,
    content: req.body.content,
  });
  await newPost.save();
  res.redirect('/');
}));

router.get('/post/delete/:id', asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id).exec();
  res.redirect('/');
}));

module.exports = router;
