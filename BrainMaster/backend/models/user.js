'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // Paper added
      User.hasMany(models.Paper, {
        foreignKey: 'added_by',
        as: 'papers',
      });
      // Exam answered
      User.hasMany(models.Exam, {
        foreignKey: 'participant_user',
        as: 'exams',
      });
      // Question asked
      User.hasMany(models.Question, {
        foreignKey: 'asked_by',
        as: 'questions',
      });
      // Answer answered
      User.hasMany(models.Answer, {
        foreignKey: 'answered_by',
        as: 'answers',
      });
      // News added
      User.hasMany(models.News, {
        foreignKey: 'added_by',
        as: 'news',
      });
      // Event added
      User.hasMany(models.Event, {
        foreignKey: 'added_by',
        as: 'events',
      });
      // Knowledge added
      User.hasMany(models.Knowledge, {
        foreignKey: 'added_by',
        as: 'knowledge',
      });
      // Ad added
      User.hasMany(models.Advertisement, {
        foreignKey: 'added_by',
        as: 'advertisements1',
      });
      // Ad approved
      User.hasMany(models.Advertisement, {
        foreignKey: 'approved_by',
        as: 'advertisements2',
      });
    }
  };
  User.init({
    user_id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    total_marks: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};