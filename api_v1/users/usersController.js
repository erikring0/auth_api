const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const process = require('process');
const db = require('../../model');

function findUserByEmail(req, res, next) {
  db.User.findOne({ where: { email: req.body.email } })
    .then((existingUser) => {
      if (existingUser) {
        req.user = existingUser;
        next();
      } else res.status(401).send('This account does not exist.');
    })
    .catch((err) => next(err));
}

function comparePassword(req, res, next) {
  bcrypt
    .compare(req.body.password, req.user.getDataValue('password'))
    .then((existingPassword) => {
      if (existingPassword) next();
      else res.status(401).send('This password is incorrect.');
    })
    .catch((err) => next(err));
}

function generateJSONToken(req, res, next) {
  req.user.token = jwt.sign(req.user.toJSON(), process.env.MY_SECRET, {
    expiresIn: '24h',
  });
  next();
}
/*
    Validate data
    Verify the user does not exist
    Add the user if they do not exist

    req.user = {phash: hashPassword}
*/

function validateEmail(req, res, next) {
  if (!validator.isEmail(req.body.email)) {
    res.status(403).json({ success: false, message: 'Email is not valid.' });
  } else next();
}

function validatePassword(req, res, next) {
  if (!validator.isStrongPassword(req.body.password, {
    minLength: 7,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 1,
  })) {
    res.status(403).json({ success: false, message: 'Password is not strong. Please include at least 7 characters and 1 symbol.' });
  } else next();
}

function isNewUser(req, res, next) {
  db.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) res.status(409).send('This account may already exist.');
      else next();
    })
    .catch((err) => next(err));
}

function hashPassword(req, res, next) {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      next();
    })
    .catch((err) => next(err));
}

function addUser(req, res, next) {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      req.newUser = newUser;
      next();
    })
    .catch((err) => next(err));
}

module.exports = {
  validateEmail,
  validatePassword,
  isNewUser,
  hashPassword,
  addUser,
  findUserByEmail,
  comparePassword,
  generateJSONToken,
};
