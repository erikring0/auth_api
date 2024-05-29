const bcrypt = require('bcrypt')
const {User} = require('../../model/user')

/* 
    Validate data
    Verify the user does not exist
    Add the user if they do not exist

    req.user = {phash: hashPassword}
*/

function validateData(req, res, next) {
    var errorMessage = []
    if(req.body.username.length < 3){
        errorMessage.push('Username must contain at least 3 characters.' + '\n')
    }
    if(req.body.password.length < 7){
        errorMessage.push('Password must contain at least 7 characters.')
    }
    if(errorMessage.length > 0) {
        res.status(403).send(errorMessage)
    } next()
}


async function isNewUser(req, res, next) {
    const existingUser = await User.findOne({ where: { username: req.body.user.username } })
    if(existingUser) {
        res.status(409).send('This username already exists.')
    } next()
}

function hashPassword(req, res, next) {
    req.user = {}
}

function addUser(req, res, next) {

}

module.exports = {validateData}