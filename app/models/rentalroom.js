'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RentalRoom.init({
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE
    },
    area: {
      type: DataTypes.INTEGER
    },
    numberPeople: {
      type: DataTypes.INTEGER,
      field: 'number_people'
    },
    vacancyDate: {
      type: DataTypes.DATEONLY
    },
    note: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 0
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
    modelName: 'RentalRoom',
  });
  return RentalRoom;
};