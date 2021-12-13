'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RentalRooms', {
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
      area: {
        type: Sequelize.INTEGER
      },
      numberPeople: {
        type: Sequelize.INTEGER,
        field: 'number_people'
      },
      vacancyDate: {
        type: Sequelize.DATEONLY
      },
      note: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 0
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
    await queryInterface.dropTable('RentalRooms');
  }
};