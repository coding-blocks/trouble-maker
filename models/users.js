'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    firstname:  DataTypes.STRING,
    lastname: DataTypes.STRING,
    oneauth_id: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM ('USER', 'ADMIN'),
      defaultValue: 'USER'
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};