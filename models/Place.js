const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Place model
class Place extends Model {}

// create field/columns for Place model
Place.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'place'
  }
);

module.exports = Place;