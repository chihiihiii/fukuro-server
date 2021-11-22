'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PremiumService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PremiumService.init({
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE
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
    modelName: 'PremiumService',
  });
  return PremiumService;
};