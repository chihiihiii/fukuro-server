'use strict';

const crypto = require('crypto');

var password = crypto.createHmac('sha256', 'mypassword')
  .update('123456')
  .digest('hex');


module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('Admins', [{
        username: 'admin_chi',
        password: password,
        role: 'admin',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'admin_mai',
        password: password,
        role: 'admin',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'admin_binh',
        password: password,
        role: 'admin',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'admin_toan',
        password: password,
        role: 'admin',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});


  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Admins', null, {});

  }
};