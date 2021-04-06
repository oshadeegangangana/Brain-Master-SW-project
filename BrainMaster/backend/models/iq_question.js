'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IQ_Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IQ_Question.belongsTo(models.Paper, {
        foreignKey: 'paper_id',
        as: 'paper',
        onDelete: 'CASCADE',
      });
    }
  };
  IQ_Question.init({
    question_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    paper_id: DataTypes.INTEGER,
    question_type: DataTypes.STRING,
    question: DataTypes.STRING,
    option_1: DataTypes.STRING,
    option_2: DataTypes.STRING,
    option_3: DataTypes.STRING,
    option_4: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IQ_Question',
  });
  return IQ_Question;
};