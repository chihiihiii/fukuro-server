'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CustomerPremiumServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE,
        field: 'start_date'
      },
      endDate: {
        type: Sequelize.DATE,
        field: 'end_date'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 1
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
      premiumId: {
        type: Sequelize.INTEGER,
        field: 'premium_id',
        references: {
          model: {
            tableName: 'PremiumServices',
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
    await queryInterface.dropTable('CustomerPremiumServices');
  }
};