'use strict'
module.exports = (sequelize,DataTypes) => {
    let quiz = sequelize.define('quiz',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true
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
    },{})
    
    quiz.associate = function (models) {
        quiz.belongsTo(models.users,{foreignKey: 'addedById'})
        quiz.hasMany(models.questions)
    }
    return quiz;
}