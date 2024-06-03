const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const process = require("process");
const db = require("../../model/db");

function findUserByEmail(req, res, next) {
  db.models.User.findOne({ where: { email: req.body.email } })
    .then((existingUser) => {
      if (existingUser) {
        req.user = existingUser;
        next();
      } else res.status(401).send("This account does not exist.");
    })
    .catch((err) => next(err));
}

function validateUserPassword(req, res, next) {
  bcrypt
    .compare(req.body.password, req.user.getDataValue("password"))
    .then((existingPassword) => {
      if (existingPassword) next();
      else res.status(401).send("This password is incorrect.");
    })
    .catch((err) => next(err));
}

function generateJSONToken(req, res, next) {
  req.user.token = jwt.sign(req.user.toJSON(), process.env.MY_SECRET, {
    expiresIn: "24h",
  });
  next();
}

module.exports = { findUserByEmail, validateUserPassword, generateJSONToken };
