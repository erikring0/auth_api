const bcrypt = require('bcrypt')
const db = require('../../model/db')

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
    } else next()
}

async function isNewUser(req, res, next) {
    const existingUser = await db.user.findOne({ where: { username: req.body.username } })
    if(existingUser) {
        res.status(409).send('This username already exists.')
    } else next()   
}

async function hashPassword(req, res, next) {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword
        next()
    } catch(e) {
        console.error(e.errorMessage)
    }
}

function addUser(req, res, next) {
    db.sequelize.sync().then((x) => {
        x.models.User.create({
            firstName: req.body.firstName ,
            lastName: req.body.lastName ,
            username: req.body.username ,
            password: req.body.password }
        )
        console.log(req.body)
    }) 
    next()
}

module.exports = { validateData, isNewUser, hashPassword, addUser }