'use strict';
const Question = require('../models').questions

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('questions', 'multiCorrect', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }).then(() => {
      return Question.findAll()
    }).then((questions) => {
        return Promise.all(
          questions.map((question) => {
            let correctAnsLength = 0
            if (question.correctAnswers && Array.isArray(question.correctAnswers)) {
              correctAnsLength = question.correctAnswers.length
            }
            question.multiCorrect = (correctAnsLength > 1)
            return question.save()
          })
        )
    }).then(() => {
      return [queryInterface.changeColumn('questions','multiCorrect', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })]
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('questions', 'multiCorrect')
  }
};