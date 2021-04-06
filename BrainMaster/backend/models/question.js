'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      Question.belongsTo(models.User, {
        foreignKey: 'asked_by',
        as: 'user',
        onDelete: 'CASCADE',
      });
      // Answer
      Question.hasMany(models.Answer, {
        foreignKey: 'question_id',
        as: 'answers',
      });
    }
  };
  Question.init({
    question_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    asked_by: DataTypes.INTEGER,
    question: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};