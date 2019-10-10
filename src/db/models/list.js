'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
    type: DataTypes.STRING,
    allowNull: false
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.hasMany(models.Grocery, {
      foreignKey: "listId",
      as: "groceries"
    });
  };
  return List;
};