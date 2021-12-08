'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 1
      },
      like: {
        type: Sequelize.TEXT,
      },
      dislike: {
        type: Sequelize.TEXT,
      },
      customerId: {
        type: Sequelize.INTEGER,
        field: 'customer_id',
        references: {
          model: {
            tableName: 'Customers',
          },
          key: 'id'
        },
      },
      adminId: {
        type: Sequelize.INTEGER,
        field: 'admin_id',
        references: {
          model: {
            tableName: 'Admins',
          },
          key: 'id'
        },
      },
      questionId: {
        type: Sequelize.INTEGER,
        field: 'question_id',
        references: {
          model: {
            tableName: 'Questions',
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Answers');
  }
};