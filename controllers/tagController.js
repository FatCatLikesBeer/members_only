const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Tag = require('../models/tags.js');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const createError = require('http-errors');

exports.tag_get_list = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authenticated: YES");
    res.send("Tag GET not yet implemented");
  } else {
    console.log("authenticated: NO");
    res.send("Tag GET not yet implemented");
  }
});

exports.tag_detail = asyncHandler(async (req, res, next) => {
  res.send(`Tag detail GET not yet implemented: ${req.params.id}`);
});

exports.tag_create_get = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authenticated: YES");
    res.send("Tag Create GET not yet implemented");
  } else {
    console.log("authenticated: NO");
    next(createError(404));
  }
});

exports.tag_create_post = asyncHandler(async (req, res, next) => {
  res.send("Tag Create POST not yet implemented");
});

exports.tag_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`Tag DELETE GET not yet implemented: ${req.params.id}`);
});

exports.tag_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`Tag DELETE POST not yet implemented: ${req.params.id}`);
});

exports.tag_update_get = asyncHandler(async (req, res, next) => {
  res.send(`Tag update GET not yet implemented: ${req.params.id}`);
});

exports.tag_update_post = asyncHandler(async (req, res, next) => {
  res.send(`Tag Update POST not yet implemented: ${req.params.id}`);
});

