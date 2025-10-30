const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Ticket = require('./Ticket');

class Comment extends Model {}

Comment.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: true
});

Comment.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
Comment.belongsTo(Ticket, { as: 'ticket', foreignKey: 'ticketId' });

User.hasMany(Comment, { as: 'comments', foreignKey: 'authorId' });
Ticket.hasMany(Comment, { as: 'comments', foreignKey: 'ticketId' });

module.exports = Comment;