const bcrypt = require('bcrypt');
const validator = require('validator');
const db = require('../../model/db');

/*
    Validate data
    Verify the user does not exist
    Add the user if they do not exist

    req.user = {phash: hashPassword}
*/

function validateData(req, res, next) {
  const errorMessage = [];
  if (!validator.isEmail(req.body.email)) {
    errorMessage.push('Email is not valid.' + '\n');
  }
  if (
    !validator.isStrongPassword(req.body.password, {
      minLength: 7,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 1,
    })
  ) {
    errorMessage.push(
      'Password is not strong. Please include at least 7 characters and 1 symbol.',
    );
  }
  if (errorMessage.length > 0) {
    res.status(403).send(errorMessage);
  } else next();
}

function isNewUser(req, res, next) {
  db.models.User.findOne({ where: { email: req.body.email } })
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
  db.models.User.create({
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
  validateData, isNewUser, hashPassword, addUser,
};
