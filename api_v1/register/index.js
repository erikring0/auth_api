const router = require('express').Router();
const ctrl = require('./registerController')
const User = require('../../model/user')
const bcrypt = require('bcrypt');
const sequelize = require('../../model/db');

router.post('/',ctrl.validateData, 
                ctrl.isNewUser, 
                ctrl.hashPassword, 
                ctrl.addUser, 
                (req, res) => {
    res.json({success: true, message: req.User})
})

module.exports = router;

// add the new user to the database and hash their password before