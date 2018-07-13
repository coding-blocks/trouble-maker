'use strict';
module.exports = (sequelize, DataTypes) => {
  var keys = sequelize.define('keys', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.UUID,
      allowNull: false,
    }
    // userId: {
    //   type: DataTypes.BIGINT,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   },
    //   onUpdate: 'cascade',
    //   onDelete: 'cascade'
    // }
  }, {});
  keys.associate = function(models) {
    keys.belongsTo(models.users)
  };
  return keys;
};