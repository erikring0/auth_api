const router = require('express').Router();
const ctrl = require('./registerController')
const User = require('../../model/user')
const bcrypt = require('bcrypt');
const sequelize = require('../../model/db');
const db = require("../../model")

router.post('/', ctrl.validateData, (req, res) => {
   
   
    const test = { firstName, lastName, userName, password } = req.body;
    console.log(test)
    db.User.create(test)
        .then(user => {
        res.status(201).json(user);
        })
        .catch(err => {
        res.status(400).json({ error: err.message });
    });
});

module.exports = router;

// add the new user to the database and hash their password before