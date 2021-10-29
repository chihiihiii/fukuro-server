'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Blog.init({
    title: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.TEXT
    },
    content: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING
    },
    blogCategoryId: {
      type: DataTypes.INTEGER,
      field: 'blog_category_id',
      references: {
        model: {
          tableName: 'BlogCategories',
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
    modelName: 'Blog',
  });
  return Blog;
};