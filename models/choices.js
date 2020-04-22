'use strict';
module.exports = (sequelize, DataTypes) => {
  var choices = sequelize.define('choices', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  choices.associate = function(models) {
    // associations can be defined here
  };
  return choices;
};