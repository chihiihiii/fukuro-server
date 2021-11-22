'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RentalNews.init({
    name: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DOUBLE
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    area: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.TEXT
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 1
    },
    promotionId: {
      type: DataTypes.INTEGER,
      field: 'promotion_id',
      references: {
        model: {
          tableName: 'Promotions',
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
    modelName: 'RentalNews',
  });
  return RentalNews;
};