'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      Answer.belongsTo(models.User, {
        foreignKey: 'answered_by',
        as: 'user',
        onDelete: 'CASCADE',
      });
      // Question
      Answer.belongsTo(models.Question, {
        foreignKey: 'question_id',
        as: 'question',
        onDelete: 'CASCADE',
      });
    }
  };
  Answer.init({
    answer_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    question_id: DataTypes.INTEGER,
    answered_by: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};