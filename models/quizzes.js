'use strict'
module.exports = (sequelize,DataTypes) => {
    let quizzes = sequelize.define('quizzes',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false
        },
        duration:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        maxAttempts:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        startDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        paranoid: true
    })
    
    quizzes.associate = function (models) {
        quizzes.belongsTo(models.users,{foreignKey: 'addedById'})
        quizzes.belongsTo(models.users,{foreignKey: 'updatedById'})
        quizzes.belongsToMany(models.questions, {through: models.quizQuestions})
    }
    return quizzes;
}