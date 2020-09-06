'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('quizQuestions', {
      name: "quizQuestions_quizId_questionsid_partialIndex",
      fields: ["quizId", "questionId"],
      unique: "id",
      where: {
        deletedAt: null
      }
    })
    await queryInterface.removeConstraint('quizQuestions', 'quizQuestions_questionId_quizId_key')
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
