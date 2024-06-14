const nodemailer = require('nodemailer');
const process = require('process');
const moment = require('moment');
const db = require('../model');

function validateReset(req, res, next) {
  req.user.token = Math.floor(1000 + Math.random() * 8999);
  req.user.expDate = moment().add(10, 'minutes').unix().toString();
  req.user.update(
    {
      resetToken: req.user.token,
      resetExp: req.user.expDate,
    },
  ).then(() => { next(); })
    .catch((err) => next(err));
}

function sendEmail(req, res, next) {
  const link = `http://localhost:3000/user/reset-password?id=${req.user.id}&token=${req.user.token}`;
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: 'a3f4cbb7c4448e',
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'auth_api@coding.co',
    to: `${req.body.email}`,
    subject: 'Auth_API Password Reset',
    text: `To reset your password, please navigate to the following link: ${link}.`,
  };

  transporter.sendMail(mailOptions)
    .then(() => { next(); })
    .catch((err) => next(err));
}

function resetPassword(req, res, next) {
  db.User.findOne({ where: { id: req.query.id } })
    .then((user) => {
      if (user.resetExp && user.resetToken && user.resetToken === Number(req.query.token)
        && moment().unix() < Number(user.resetExp)) {
        user.update(
          {
            resetToken: null,
            resetExp: null,
            password: req.body.password,
          },
        ).then(() => next()).catch((err) => next(err));
      } else res.status(401).json({ success: false, message: 'Reset token not valid, please try again.' });
    }).catch((err) => next(err));
}

module.exports = { validateReset, sendEmail, resetPassword };
