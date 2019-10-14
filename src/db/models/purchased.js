'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchased = sequelize.define('Purchased', {
    groceryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Purchased.associate = function(models) {
    // associations can be defined here
    Purchased.belongsTo(models.Grocery, {
      foreignKey: "groceryId",
      onDelete: "CASCADE" 
    });
    Purchased.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE" 
    });
  };
  return Purchased;
};