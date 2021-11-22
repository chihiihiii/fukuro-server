'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PremiumBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PremiumBill.init({
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE
    },
    expire: {
      type: DataTypes.INTEGER
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      field: 'total_price'
    },
    paymentStatus: {
      type: DataTypes.INTEGER,
      field: 'payment_status',
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 0
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
    premiumId: {
      type: DataTypes.INTEGER,
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
    modelName: 'PremiumBill',
  });
  return PremiumBill;
};