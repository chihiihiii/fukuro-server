'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RentalBill.init({
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE
    },
    electricityFee: {
      type: DataTypes.DOUBLE,
      field: 'electricity_fee'
    },
    waterFee: {
      type: DataTypes.DOUBLE,
      field: 'water_fee'
    },
    internetFee: {
      type: DataTypes.DOUBLE,
      field: 'internet_fee'
    },
    otherFee: {
      type: DataTypes.DOUBLE,
      field: 'other_fee'
    },
    feeDesc: {
      type: DataTypes.TEXT,
      field: 'fee_desc'
    },
    prepay: {
      type: DataTypes.DOUBLE
    },
    discountPrice: {
      type: DataTypes.DOUBLE,
      field: 'discount_price'
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      field: 'total_price'
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
    customerId: {
      type: DataTypes.INTEGER,
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
    modelName: 'RentalBill',
  });
  return RentalBill;
};