'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      Advertisement.belongsTo(models.User, {
        foreignKey: 'added_by',
        as: 'user',
        onDelete: 'CASCADE',
      });
      // User
      Advertisement.belongsTo(models.User, {
        foreignKey: 'approved_by',
        as: 'user1',
        onDelete: 'SET NULL',
      });
    }
  };
  Advertisement.init({
    ad_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    desc: DataTypes.STRING,
    ad_img: DataTypes.STRING,
    status: DataTypes.STRING,
    added_by: DataTypes.INTEGER,
    approved_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Advertisement',
  });
  return Advertisement;
};