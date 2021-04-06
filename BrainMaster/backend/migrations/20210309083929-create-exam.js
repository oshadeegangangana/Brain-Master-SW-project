'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exams', {
      exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paper_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Papers',
          },
          key: 'paper_id',
        },
        // allowNull: false,
        onDelete: 'SET NULL',
      },
      participant_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'user_id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      marks: {
        type: Sequelize.FLOAT
      },
      grade: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Exams');
  }
};