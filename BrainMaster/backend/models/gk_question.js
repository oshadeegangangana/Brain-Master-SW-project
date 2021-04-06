'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GK_Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GK_Question.belongsTo(models.Paper, {
        foreignKey: 'paper_id',
        as: 'paper',
        onDelete: 'CASCADE',
      });
    }
  };
  GK_Question.init({
    question_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    paper_id: DataTypes.INTEGER,
    question: DataTypes.STRING,
    option_1: DataTypes.STRING,
    option_2: DataTypes.STRING,
    option_3: DataTypes.STRING,
    option_4: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GK_Question',
  });
  return GK_Question;
};