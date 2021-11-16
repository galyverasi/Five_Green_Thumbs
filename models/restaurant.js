'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.restaurant.belongsToMany(models.user, { through: "userRestaurants" })
      models.restaurant.hasMany(models.review)
    }
  };
  restaurant.init({
    name: DataTypes.STRING,
    priceRange: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    hours: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'restaurant',
  });
  return restaurant;
};