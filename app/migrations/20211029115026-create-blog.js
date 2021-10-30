'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      tag: {
        type: DataTypes.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      blogCategoryId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Blogs');
  }
};