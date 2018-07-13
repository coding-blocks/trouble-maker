'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      oneauth_id: {
        type: Sequelize.BIGINT,
        unique: true,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM ('USER', 'ADMIN'),
        defaultValue: 'USER'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};