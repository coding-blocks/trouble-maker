'use strict'
module.exports = (sequelize,DataTypes) => {
    let quizQuesions = sequelize.define('quizQuestions',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        QuizId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        QuestionId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{})
    return quizQuesions;
}