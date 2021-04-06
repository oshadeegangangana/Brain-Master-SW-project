'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Knowledge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      Knowledge.belongsTo(models.User, {
        foreignKey: 'added_by',
        as: 'user',
        onDelete: 'SET NULL',
      });
    }
  };
  Knowledge.init({
    knowledge_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    desc: DataTypes.STRING,
    file: DataTypes.STRING,
    added_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Knowledge',
  });
  return Knowledge;
};