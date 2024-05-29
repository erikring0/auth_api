let getConnection = require('../../model/db')

function findUserByEmail(req,res,next){
    //find the user in the database by email
    //if found add user to req object == next()
    //if not found find correct http respnose code res.json 

    next()
}
function validateUserPassword(req,res,next){
    //using bcrypt verify user password matches user from db password
    // if matches next 
    // if not matching find correct http respnose code res.json 
    next()
}
function generateJSONToken(req,res,next){
    //using user object create token that expires in 24 hours ==> next
    next()
} 

module.exports = {findUserByEmail, validateUserPassword, generateJSONToken}