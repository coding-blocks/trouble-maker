'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('quizQuestions', 'quizQuestions_quizId_questionId_key')
    await queryInterface.addIndex('quizQuestions', {
      name: "quizQuestions_quizId_questionId_partialIndex",
      fields: ["quizId", "questionId"],
      unique: true,
      where: {
        deletedAt: null
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('quizQuestions', 'quizQuestions_quizId_questionId_partialIndex')
    await queryInterface.addIndex('quizQuestions', {
      name: 'quizQuestions_quizId_questionId_key',
      fields: ["quizId", "questionId"],
      unique: true
    })
  }
};
