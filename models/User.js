const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class User extends Model {}

User.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { isEmail: true } },
  password_hash: { type: DataTypes.STRING(100), allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'comum'), allowNull: false, defaultValue: 'comum' }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});

module.exports = User;
