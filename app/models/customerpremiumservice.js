'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerPremiumService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CustomerPremiumService.init({
    startDate: {
      type: DataTypes.DATE,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      field: 'end_date'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 1
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
    modelName: 'CustomerPremiumService',
  });
  return CustomerPremiumService;
};