'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RentalBills', {
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
      electricityFee: {
        type: Sequelize.DOUBLE,
        field: 'electricity_fee'
      },
      waterFee: {
        type: Sequelize.DOUBLE,
        field: 'water_fee'
      },
      internetFee: {
        type: Sequelize.DOUBLE,
        field: 'internet_fee'
      },
      otherFee: {
        type: Sequelize.DOUBLE,
        field: 'other_fee'
      },
      feeDesc: {
        type: Sequelize.TEXT,
        field: 'fee_desc'
      },
      prepay: {
        type: Sequelize.DOUBLE
      },
      discountPrice: {
        type: Sequelize.DOUBLE,
        field: 'discount_price'
      },
      totalPrice: {
        type: Sequelize.DOUBLE,
        field: 'total_price'
      },
      note: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 1
      },
      rentalId: {
        type: Sequelize.INTEGER,
        field: 'rental_id',
        references: {
          model: {
            tableName: 'Rentals',
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
    await queryInterface.dropTable('RentalBills');
  }
};