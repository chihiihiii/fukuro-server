'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('BlogCategories', [{
        name: 'Tin bất động sản',
        slug: 'tin-bat-dong-san',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Chung cư',
        slug: 'chung-cu',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nhà đẹp',
        slug: 'nha-dep',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lời khuyên chuyên gia',
        slug: 'loi-khuyen-chuyen-gia',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};