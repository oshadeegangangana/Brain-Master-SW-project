'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exam.belongsTo(models.Paper, {
        foreignKey: 'paper_id',
        as: 'paper',
        onDelete: 'SET NULL',
      });
      Exam.belongsTo(models.User, {
        foreignKey: 'participant_user',
        as: 'user',
        onDelete: 'CASCADE',
      });
    }
  };
  Exam.init({
    exam_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    paper_id: DataTypes.INTEGER,
    participant_user: DataTypes.INTEGER,
    marks: DataTypes.FLOAT,
    grade: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};