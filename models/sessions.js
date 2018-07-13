'use strict';
module.exports = (sequelize, DataTypes) => {
  var sessions = sequelize.define('sessions', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  sessions.associate = function(models) {
    sessions.belongsTo(models.users)
  };
  return sessions;
};