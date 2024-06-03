const router = require('express').Router();
const ctrl = require('./registerController');

router.post('/',ctrl.validateData, 
    ctrl.isNewUser, 
    ctrl.hashPassword, 
    ctrl.addUser, 
    (req, res) => {
        res.json({success: true, message: req.newUser});
    });

module.exports = router;

// add the new user to the database and hash their password before