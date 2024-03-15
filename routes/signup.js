const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const signupController = require('../controllers/signupController.js');

// Sign up GET //
router.get('/', signupController.signup_get);

// Sign up POST //
router.post('/', signupController.signup_post);

module.exports = router;
