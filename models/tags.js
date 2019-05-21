'use-strict'
module.exports = (Sequelize, DataTypes) => {
  const tags = Sequelize.define('tags', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { paranoid: true })

  tags.associate = function(models) {
    tags.belongsTo(models.users,{foreignKey: 'createdBy'})
    tags.belongsToMany(models.questions, {through: models.question_tags})
  }

  return tags
}