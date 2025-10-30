require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
  timezone: '-03:00'
});

async function testConnection() {
  try {
    console.log('[DB] Tentando conectar...', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      db: process.env.DB_NAME
    });
    await sequelize.authenticate();
    console.log('[DB] OK: conectado ao MySQL.');
  } catch (e) {
    console.error('===== FALHA NA CONEXÃO MySQL =====');
    console.error('code:', e.code);
    console.error('message:', e.message);
    console.error('sqlMessage:', e.parent?.sqlMessage || e.original?.sqlMessage);
    console.error('errno:', e.parent?.errno);
    console.error('address:', e.parent?.address, 'port:', e.parent?.port);
    console.error('sql:', e.sql || e.parent?.sql || e.original?.sql);
    throw e;
  }
}

module.exports = { sequelize, testConnection };
