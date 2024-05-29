const {DataTypes} = require('sequelize')
const sequelize = require('./db')

const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(60).BINARY,
            allowNull: false
        }
    }
).sync({force: false})
console.log(User)

module.exports = User
