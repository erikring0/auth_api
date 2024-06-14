const router = require('express').Router();
const ctrl = require('./usersController');
const email = require('../../email/emailController');
// const twil = require('../../twilio');

router.post(
  '/',
  ctrl.validateEmail,
  ctrl.validatePassword,
  ctrl.isNewUser,
  ctrl.hashPassword,
  ctrl.addUser,
  (req, res) => { res.json({ success: true, message: req.newUser }); },
);

router.post(
  '/login',
  ctrl.findUserByEmail,
  ctrl.comparePassword,
  ctrl.generateJSONToken,
  (req, res) => { res.json({ success: true, message: req.user.token }); },
);

router.post(
  '/password-reset-input',
  ctrl.findUserByEmail,
  email.validateReset,
  email.sendEmail,
  (req, res) => { res.json({ success: true, message: 'Follow the instructions sent to your email.' }); },
);

router.post(
  '/reset-password',
  ctrl.validatePassword,
  ctrl.hashPassword,
  email.resetPassword,
  (req, res) => { res.json({ success: true, message: 'Password is now reset. Please log in.' }); },
);

module.exports = router;
