'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Answer.init({
    content: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 1
    },
    like: {
      type: DataTypes.TEXT,
    },
    dislike: {
      type: DataTypes.TEXT,
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
    questionId: {
      type: DataTypes.INTEGER,
      field: 'question_id',
      references: {
        model: {
          tableName: 'Questions',
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
    modelName: 'Answer',
  });
  return Answer;
};