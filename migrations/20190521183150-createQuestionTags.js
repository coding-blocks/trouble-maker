'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('question_tags', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('question_tags')
  }
};
