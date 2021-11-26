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
        email: 'Chithlpc00459@fpt.edu.vn',
        role: 'admin',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'admin_mai',
        password: password,
        email: 'Maidtppc00654@fpt.edu.vn',
        role: 'admin',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'admin_binh',
        password: password,
        email: 'Binhnppc00541@fpt.edu.vn',
        role: 'admin',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'admin_toan',
        password: password,
        email: 'Toantqpc00613@fpt.edu.vn',
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