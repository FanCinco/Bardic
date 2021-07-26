const { Model, DataTypes, DECIMAL, DATE, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

// create DailyExpense model
class Post extends Model {}

// create fields/columns for DailyExpense
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'story',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    modelName: 'post'
  }
);

module.exports = Post;