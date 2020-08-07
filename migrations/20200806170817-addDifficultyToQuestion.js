'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addColumn('questions', 'difficulty', {
      type: Sequelize.ENUM('EASY', 'MEDIUM', 'HARD'), 
      allowNull: false,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('questions', 'difficulty')
  }
};