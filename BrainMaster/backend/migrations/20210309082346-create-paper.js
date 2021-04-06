'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Papers', {
      paper_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paper_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      paper_type: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      added_by: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'user_id',
        },
        // allowNull: false,
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Papers');
  }
};