const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const nodemailer = require('nodemailer');

/* Support GET */
router.get('/', asyncHandler(async (req, res, next) => {
  res.render('support', {
    title: "Members Only",
    user: req.user,
  });
})
);

/* Support POST */
router.post('/', asyncHandler(async (req, res, next) => {
  const [username, email, issue] = [req.body.username, req.body.email, req.body.issue];

  // Email stuff
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'itisbilly@gmail.com',
      pass: process.env.GMAIL,
    }
  });
  const mailOptions = {
    from: "itisbilly@gmail.com",
    to: email,
    cc: 'itisbilly@gmail.com',
    subject: "Members Only: Support issue",
    text: issue,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).render('support_confirmation', {
        title: "Members Only",
        user: req.user,
        username: username,
        email: email,
        issue: issue,
        success: false,
      });
    } else {
      console.log('Email sent:', info.response);
      res.render('support_confirmation', {
        title: "Members Only",
        user: req.user,
        username: username,
        email: email,
        issue: issue,
        success: true,
      });
    }
  })

  // Render page
}));

module.exports = router;
