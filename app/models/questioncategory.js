'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuestionCategory.init({
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 1
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
    }  }, {
    sequelize,
    modelName: 'QuestionCategory',
  });
  return QuestionCategory;
};