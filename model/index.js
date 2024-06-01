const sequelize = require('./db');
const User = require('./user');

const db = { sequelize, User };

// Sync the models with the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;
