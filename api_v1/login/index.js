router = require('express').Router();
const ctrl = require('./loginController');

router.post('/',ctrl.findUserByUsername, 
                ctrl.validateUserPassword, 
                ctrl.generateJSONToken, 
                (req, res, next) => {

    res.json({success: true, message: req.user.token})
})

module.exports = router;

// using bcrypt retrieve user using username
// compare provided password against user password
// replacement for bcrypt is nodejs.org cryptolibrary
