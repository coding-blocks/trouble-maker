'use strict';

module.exports = {
  async up (queryInterface, Sequelize){
   await queryInterface.addColumn(
      'questions',
      'explanation',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('questions', 'explanation');
  }
};
