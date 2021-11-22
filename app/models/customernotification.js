'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CustomerNotification.init({
    message: {
      type: DataTypes.TEXT
    },
    detailUrl: {
      type: DataTypes.TEXT,
      field: 'detail_url'
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
    modelName: 'CustomerNotification',
  });
  return CustomerNotification;
};