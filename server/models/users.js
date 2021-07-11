'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {

    }
  };
  Users.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      userId: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Users',
    });
  return Users;
};