const { sequelize, testConnection } = require('../config/db');
const User = require('./User');
const Ticket = require('./Ticket');

async function syncModels() {
  await testConnection();
  await sequelize.sync({ alter: true });
  console.log('[OK] Modelos sincronizados.');
}

module.exports = { sequelize, User, Ticket, syncModels };
