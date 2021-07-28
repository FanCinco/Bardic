const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Expense model
class Expense extends Model {}

// create fields/columns for Expense
Expense.init(
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
    modelName: 'Expense'
  }
);

module.exports = Expense;