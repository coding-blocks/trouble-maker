'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('users', [{
      firstname: 'Dummy',
      lastname: 'Dummy',
      oneauth_id: 10,
      email: 'dummy@codingblocks.com',
      role: 'ADMIN',
      createdAt: '2018-05-26 09:16:00.195+00',
      updatedAt: '2018-05-26 09:16:00.195+00'
    }]).then(() => {
      queryInterface.bulkInsert('keys', [{
        key: 'C40663A3-3BE8-41BD-A65F-5D6BB530BE62',
        userId: 1,
        createdAt: '2018-05-26 09:16:00.195+00',
        updatedAt: '2018-05-26 09:16:00.195+00'
      }])
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('users')
  }
};
