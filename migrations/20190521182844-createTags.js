'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('tags', {
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdBy: {
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
    queryInterface.dropTable('tags')
  }
};
