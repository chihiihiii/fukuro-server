'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AdminNotification.init({
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
    adminId: {
      type: DataTypes.INTEGER,
      field: 'admin_id',
      references: {
        model: {
          tableName: 'Admins',
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
    modelName: 'AdminNotification',
  });
  return AdminNotification;
};