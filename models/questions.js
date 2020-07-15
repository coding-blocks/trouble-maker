'use strict';
module.exports = (sequelize, DataTypes) => {
  var questions = sequelize.define('questions', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    explanation: {
      type: DataTypes.TEXT,
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
    positiveScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    negativeScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    multicorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    paranoid: true
  });
  questions.associate = function(models) {
    questions.belongsTo(models.users, {foreignKey: 'createdById'})
    questions.hasMany(models.choices)
    questions.belongsTo(models.users,{foreignKey: 'updatedById'})
    questions.belongsToMany(models.quizzes, {through: models.quizQuestions})
    questions.belongsToMany(models.tags, {through: models.questionsTags})
  };
  return questions;
};