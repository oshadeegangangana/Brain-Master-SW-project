'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // User
      Event.belongsTo(models.User, {
        foreignKey: 'added_by',
        as: 'user',
        onDelete: 'SET NULL',
      });
    }
  };
  Event.init({
    event_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    date: DataTypes.STRING,
    venue: DataTypes.STRING,
    added_by: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};