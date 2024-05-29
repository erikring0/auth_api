const {DataTypes, Model} = require('sequelize')
const sequelize = require('./db')

class User extends Model {}

User.init(
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
    },
    {
        sequelize,
        modelName: 'User'
    }
).sync({force: false})
console.log(User)

module.exports = User
