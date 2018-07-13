'use strict';
module.exports = (sequelize, DataTypes) => {
  var questions = sequelize.define('questions', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});
  questions.associate = function(models) {
    questions.belongsTo(models.users, {foreignKey: 'createdBy'})
    questions.hasMany(models.choices)
  };
  return questions;
};