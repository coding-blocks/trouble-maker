'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const options = ['deletedAt', {
      type: Sequelize.DATE
    }]

    const promises = ['questions', 'quizzes', 'quizQuestions'].map(table => queryInterface.addColumn(table, ...options))
    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {
    // bleh
  }
};
