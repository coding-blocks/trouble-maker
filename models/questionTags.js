'use-strict'
module.exports = (Sequelize, DataTypes) => {
  const questionTags = Sequelize.define('question_tags', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    }
  }, { paranoid: true })

  questionTags.associate = function (models) {}
  
  return questionTags
}