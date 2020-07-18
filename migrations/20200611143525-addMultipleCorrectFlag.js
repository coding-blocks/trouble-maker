'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('questions', 'multicorrect', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
    // Migrate existing data
    return queryInterface.sequelize.query(`
      update questions
          set multicorrect = array_length("correctAnswers", 1) > 1
      where array_length("correctAnswers", 1) is not null;
    `)

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('questions', 'multicorrect')
  }
};
