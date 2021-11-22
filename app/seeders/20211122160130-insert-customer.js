'use strict';

const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const password = crypto.createHmac('sha256', 'mypassword')
      .update('123456')
      .digest('hex');


    await queryInterface.bulkInsert('Customers', [{
        username: 'customer_chi',
        password: password,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'customer_mai',
        password: password,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'customer_binh',
        password: password,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'customer_toan',
        password: password,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
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