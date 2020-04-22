'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('questions', 'positiveScore', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
      }),
      queryInterface.addColumn('questions', 'negativeScore', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('questions', 'positiveScore'),
      queryInterface.removeColumn('questions', 'negativeScore')
    ])
  }
};
