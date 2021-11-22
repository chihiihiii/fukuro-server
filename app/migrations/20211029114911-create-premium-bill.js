'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PremiumBills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      expire: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.DOUBLE,
        field: 'total_price'
      },
      paymentStatus: {
        type: Sequelize.INTEGER,
        field: 'payment_status',
        defaultValue: 0
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 0
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
    await queryInterface.dropTable('PremiumBills');
  }
};