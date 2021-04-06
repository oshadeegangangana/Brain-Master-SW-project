'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('IQ_Questions', {
      question_id: {
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
        allowNull: false,
        onDelete: 'CASCADE',
      },
      question_type: {
        type: Sequelize.STRING
      },
      question: {
        type: Sequelize.STRING
      },
      option_1: {
        type: Sequelize.STRING
      },
      option_2: {
        type: Sequelize.STRING
      },
      option_3: {
        type: Sequelize.STRING
      },
      option_4: {
        type: Sequelize.STRING
      },
      answer: {
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
    await queryInterface.dropTable('IQ_Questions');
  }
};