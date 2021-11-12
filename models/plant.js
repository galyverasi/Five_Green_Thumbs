'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  plant.init({
    name: DataTypes.STRING,
    genus: DataTypes.STRING,
    about: DataTypes.STRING,
    sell: DataTypes.BOOLEAN,
    trade: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'plant',
  });
  return plant;
};