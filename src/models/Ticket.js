const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

class Ticket extends Model {}

Ticket.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(150), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  priority: { type: DataTypes.ENUM('baixa', 'media', 'alta'), allowNull: false, defaultValue: 'baixa' },
  status: { type: DataTypes.ENUM('aberto', 'em_andamento', 'resolvido', 'fechado'), allowNull: false, defaultValue: 'aberto' }
}, {
  sequelize,
  modelName: 'Ticket',
  tableName: 'tickets',
  timestamps: true
});

Ticket.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Ticket, { as: 'tickets', foreignKey: 'authorId' });

module.exports = Ticket;
