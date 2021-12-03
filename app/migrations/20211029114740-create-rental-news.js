'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RentalNews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DOUBLE
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      streetNumber: {
        type: Sequelize.STRING,
        field: 'street_number',
      },
      street: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.STRING,
      },
      lng: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.TEXT
      },
      priority: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 1
      },
      promotionId: {
        type: Sequelize.INTEGER,
        field: 'promotion_id',
        references: {
          model: {
            tableName: 'Promotions',
          },
          key: 'id'
        },
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
    await queryInterface.dropTable('RentalNews');
  }
};