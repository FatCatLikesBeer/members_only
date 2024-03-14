const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Members Only' });
// });

// Sign up GET //
router.get('/', asyncHandler(async (req, res, next) => {
  res.render('signup', { title: 'Members Only' });
}));

// Sign up POST //
router.post('/', asyncHandler(async (req, res, next) => {
  res.send("not yet implemented")
}));

module.exports = router;
