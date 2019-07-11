'use strict'
module.exports = (sequelize, DataTypes) => {
    var questionsTags = sequelize.define('questionsTags', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        paranoid: true
    }, {
        indexes: [{
            fields: ['questionId', 'tagId'],
            unique: true,
            where: {
                deletedAt: null
            }
        }]
    })

    questionsTags.associate = function(model) {
        // Associations can be defined
    }

    return questionsTags;
}
