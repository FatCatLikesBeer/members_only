const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Sign up GET //
router.get('/', asyncHandler(async (req, res, next) => {
  res.render('login', { title: 'Members Only' });
}));

// Sign up POST //
router.post('/', asyncHandler(async (req, res, next) => {
  res.send("LOGIN: not yet implemented")
}));

module.exports = router;
