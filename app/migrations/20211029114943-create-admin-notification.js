'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdminNotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      detailUrl: {
        type: Sequelize.TEXT,
        field: 'detail_url'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 0
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
    await queryInterface.dropTable('AdminNotifications');
  }
};