'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.List, {
      foreignKey: "userId",
      as: "lists"
    });
    User.hasMany(models.Purchased, {
      foreignKey: "userId",
      as: "purchaseds" 
    });
  };
  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };

  return User;
};