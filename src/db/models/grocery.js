'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grocery = sequelize.define('Grocery', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT    // need to limit this to 2 decimal places
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false       // revisit this, need to make true but not right now
    }
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
    Grocery.belongsTo(models.List, {           // may need to become belongsToMany
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
    Grocery.hasMany(models.Purchased, {
      foreignKey: "groceryId",
      as: "purchaseds"
    });
  };
  return Grocery;
};