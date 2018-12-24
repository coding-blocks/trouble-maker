'use strict'
module.exports = (sequelize,DataTypes) => {
    let quizQuesions = sequelize.define('quizQuestions',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        }
    },{
        paranoid: true
    })

    quizQuesions.associate = function (models) {
        quizQuesions.belongsTo(models.users,{foreignKey: 'updatedById'})
    }
    return quizQuesions;
}