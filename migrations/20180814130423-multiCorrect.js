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
            let correctAnswersLength = 0
            
            if (question.correctAnswers && Array.isArray(question.correctAnswers)) {
              correctAnswerLength = question.correctAnswers.length
            }
            question.multiCorrect = (correctAnswersLength > 1)
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
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.createTable('questions', { id: Sequelize.INTEGER });
    */
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('questions', 'multiCorrect')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('questions');
    */
  }
};