let getConnection = require('../../model/db')
const db = require('../../model/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function findUserByUsername(req,res,next){
    //find the user in the database by Username
    //if found add user to req object == next()
    //if not found find correct http respnose code res.json 
    const existingUser = await db.user.findOne({ where: { username: req.body.username } })
    if (existingUser) {
        req.user = existingUser
        next()
    } else res.status(401).send('This username does not exist.')
}
function validateUserPassword(req,res,next){
    //using bcrypt verify user password matches user from db password
    // if matches next 
    // if not matching find correct http respnose code res.json 
    const hashPassword = req.user.getDataValue('password')
    bcrypt.compare(req.body.password, hashPassword, (err, result) => {
        try {
            if (result) next()
            else res.status(401).send('This password is incorrect.')
        } catch {
            console.error(err.errorMessage)
        }
    }) 
}
function generateJSONToken(req,res,next){
    //using user object create token that expires in 24 hours ==> next
    req.user.token = jwt.sign(req.user.toJSON(), process.env.MY_SECRET, { expiresIn: "24h"})
    next()
} 

module.exports = { findUserByUsername, validateUserPassword, generateJSONToken }