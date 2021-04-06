'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      Paper.belongsTo(models.User, {
        foreignKey: 'added_by',
        as: 'user',
        onDelete: 'SET NULL',
      });
      // GK Question
      Paper.hasMany(models.GK_Question, {
        foreignKey: 'paper_id',
        as: 'gk_questions',
      });
      // IQ Question
      Paper.hasMany(models.IQ_Question, {
        foreignKey: 'paper_id',
        as: 'iq_questions',
      });
      // Exam
      Paper.hasMany(models.Exam, {
        foreignKey: 'paper_id',
        as: 'exams',
      });
    }
  };
  Paper.init({
    paper_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    paper_name: DataTypes.STRING,
    paper_type: DataTypes.STRING,
    category: DataTypes.STRING,
    added_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Paper',
  });
  return Paper;
};