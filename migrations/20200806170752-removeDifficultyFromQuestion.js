'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('questions', 'difficulty')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('questions', 'difficulty', {
      type: Sequelize.INTEGER(),
      allowNull: false,
      defaultValue: 0
    })
  }
};
