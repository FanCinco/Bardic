const { Model, DataTypes, DECIMAL } = require('sequelize');
const sequelize = require('../config/connection');

// create DailyExpense model
class Story extends Model {}

// create fields/columns for DailyExpense
Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startingText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trip',
        key: 'id'
      }
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'place',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'story'
  }
);

module.exports = Story;