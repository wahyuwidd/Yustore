const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('topup_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
