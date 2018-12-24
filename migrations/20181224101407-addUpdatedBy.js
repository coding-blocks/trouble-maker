'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const options = {
      type: Sequelize.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    }

    const promises = ['questions', 'quizzes', 'quizQuestions'].map(table => queryInterface.addColumn(table, 'updatedById', options))
    Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {
    //bleh
  }
};
