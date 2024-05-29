const router = require('express').Router();
const ctrl = require('./registerController')
const User = require('../../model/user')
const bcrypt = require('bcrypt');
const sequelize = require('../../model/db');

router.post('/', ctrl.validateData, (req, res) => {
    User.sync().then(() => {
        User.create(
            { firstName: req.body.firstName },
            { lastName: req.body.lastName },
            { username: req.body.username },
            { password: req.body.password }
        )
        res.json({ response: 'You are now registered.' })
    })
})

module.exports = router;

// add the new user to the database and hash their password before