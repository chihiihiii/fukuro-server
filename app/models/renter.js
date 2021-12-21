'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Renter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Renter.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    birth: {
      type: DataTypes.DATEONLY
    },
    idNumber: {
      type: DataTypes.STRING,
      field: 'id_number'
    },
    deposit: {
      type: DataTypes.DOUBLE
    },
    period: {
      type: DataTypes.INTEGER
    },
    paymentDate: {
      type: DataTypes.INTEGER,
      field: 'payment_date'
    },
    note: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 1
    },
    rentalId: {
      type: DataTypes.INTEGER,
      field: 'rental_id',
      references: {
        model: {
          tableName: 'Rentals',
        },
        key: 'id'
      },
    },
    rentalRoomId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Renter',
  });
  return Renter;
};