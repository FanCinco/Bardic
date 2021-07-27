const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Day model
class Day extends Model {}

// create fields/columns for Day model
Day.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trip',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'day'
  }
);

module.exports = Day;