'use strict';

module.exports = {
  up: (Q, Sequelize) => {
    return [Q.changeColumn('choices','positiveWeight', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })]
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return [Q.changeColumn('choices','positiveWeight', {
      type: Sequelize.INTEGER,
      defaultValue: null
    })]
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
