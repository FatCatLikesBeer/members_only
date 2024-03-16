const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const tagController = require('../controllers/tagController.js');

// Tag GET //
router.get('/', tagController.tag_get_list);

// Tag Create GET //
router.get('/create/', tagController.tag_create_get);

// Tag Create POST //
router.post('/create/', tagController.tag_create_post);

// Tag Delete GET //
router.get('/delete/:id', tagController.tag_delete_get);

// Tag Delete POST //
router.post('/delete/:id', tagController.tag_delete_post)

// Tag Update GET //
router.get('/update/:id', tagController.tag_update_get);

// Tag Update POST //
router.post('/update/:id', tagController.tag_update_post);

// Tag Detail GET //
router.get('/:id', tagController.tag_detail);

module.exports = router;
