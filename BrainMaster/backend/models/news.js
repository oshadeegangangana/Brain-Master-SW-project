'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      News.belongsTo(models.User, {
        foreignKey: 'added_by',
        as: 'user',
        onDelete: 'SET NULL',
      });
    }
  };
  News.init({
    news_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    news_body: DataTypes.STRING,
    added_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};