'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Renters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      birth: {
        type: Sequelize.DATEONLY
      },
      idNumber: {
        type: Sequelize.STRING,
        field: 'id_number'
      },
      deposit: {
        type: Sequelize.DOUBLE
      },
      period: {
        type: Sequelize.INTEGER
      },
      paymentDate: {
        type: Sequelize.INTEGER,
        field: 'payment_date'
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
      rentalRoomId: {
        type: Sequelize.INTEGER,
        field: 'rental_room_id',
        references: {
          model: {
            tableName: 'RentalRooms',
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
    await queryInterface.dropTable('Renters');
  }
};