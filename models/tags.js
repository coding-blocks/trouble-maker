'use strict'
module.exports = (sequelize, DataTypes) => {
    var tags = sequelize.define('tags', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    });

    tags.associate = function(models) {
        tags.belongsTo(models.users),
        tags.belongsToMany(models.questions, {through: models.questionsTags})
    }

    return tags;
}