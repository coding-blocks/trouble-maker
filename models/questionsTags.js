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
    })

    questionsTags.associate = function(model) {
        // Associations can be defined
    }

    return questionsTags;
}
