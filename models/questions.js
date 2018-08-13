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
    },
    correctAnswers: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      allowNull: false,
      defaultValue: []
    },
    multipleCorrect:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  }, {});
  questions.associate = function(models) {
    questions.belongsTo(models.users, {foreignKey: 'createdById'})
    questions.hasMany(models.choices)
  };
  return questions;
};