'use strict';

const CHOICE = require('../models').choices

function getPromises(queryInterface, mcqs) {
  return mcqs.map(mcq => {
    mcq.options = mcq.options.map(option => {
      return {title: option,"createdAt" : new Date(),"updatedAt": new Date()}
    }) 
    return queryInterface.bulkInsert('choices', mcq.options, {
      returning: true
    }).then((mcq_choices) => {
        let p = queryInterface.bulkInsert('questions', [{
          title: mcq.question,
          "createdAt": new Date(),
          "updatedAt":new Date(),
          "correctAnswers": [mcq_choices[mcq.answer-1].id],
          "createdById":58,
          "updatedById":58
        }],{returning: true})
        return Promise.all([mcq_choices,p])
    }).then(([mcq_choices,ques]) => {
        return Promise.all(mcq_choices.map(choice => {
          choice["questionId"]=ques[0].id
          return CHOICE.update(choice, {
            where: {
              id: choice.id
            }
          })
        }))
    })
})
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  return Promise.all([
    ...getPromises(queryInterface, require('./files/1.js')),
    ...getPromises(queryInterface, require('./files/2.js'))
  ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
