'use strict'
module.exports = (sequelize,DataTypes) => {
    let quizQuesions = sequelize.define('quizQuestions',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        }
    },{})
    return quizQuesions;
}