const { Sequelize } = require('sequelize');
const process = require('process');

let database = process.env.NODE_ENV === 'dev' ? process.env.MYSQL_DEV_DATABASE : process.env.MYSQL_PROD_DATABASE;
let username = process.env.NODE_ENV === 'dev' ? process.env.MYSQL_DEV_USER : process.env.MYSQL_PROD_USER;
let password = process.env.NODE_ENV === 'dev' ? process.env.MYSQL_DEV_PASSWORD : process.env.MYSQL_PROD_PASSWORD;
let host = process.env.NODE_ENV === 'dev' ? process.env.MYSQL_DEV_HOST : process.env.MYSQL_PROD_HOST;

const sequelize = new Sequelize(database, username, password, { 
  host: host, 
  dialect: 'mysql' 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
