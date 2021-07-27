const { Model, DataTypes, DECIMAL } = require('sequelize');
const sequelize = require('../config/connection');

// create DailyExpense model
class DailyExpense extends Model {}

// create fields/columns for DailyExpense
DailyExpense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    day_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'day',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dailyexpense'
  }
);

module.exports = DailyExpense;