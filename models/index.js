// import all models
const User = require('./User');
const Place = require('./Place');
const Comment = require('./Comment');
const Expense = require('./Expense');
const Day = require('./Day');
const Post = require('./Post');
const Story = require('./Story');
const Trip = require('./Trip');
const UserTrip = require('./UserTrip');

// create associations
// User associations

User.hasMany(Story, {
  foreignKey: 'user_id'
});

User.hasMany(Post, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

User.hasMany(UserTrip, {
  foreignKey: 'user_id'
});

Story.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

UserTrip.belongsTo(User, {
  foreignKey: 'user_id'
});

// Place associations
Place.hasMany(Trip, {
  foreignKey: 'place_id'
})

Trip.belongsTo(Place, {
  foreignKey: 'place_id'
});

Place.hasMany(Story, {
  foreignKey: 'place_id'
});

Story.belongsTo(Place, {
  foreignKey: "place_id"
});

// Trip associations
Trip.hasMany(UserTrip, {
  foreignKey: 'trip_id'
});

Trip.hasMany(Story, {
  foreignKey: 'trip_id'
});

Story.belongsTo(Trip, {
  foreignKey: 'trip_id'
});

Trip.hasMany(Day, {
  foreignKey: 'trip_id'
});

Day.belongsTo(Trip, {
  foreignKey: 'trip_id'
});

UserTrip.belongsTo(Trip, {
  foreignKey: 'trip_id'
});

Post.belongsTo(Trip, {
  foreignKey: "trip_id"
});

// Story associations
Story.hasMany(Post, {
  foreignKey: 'story_id'
});

Post.belongsTo(Story, {
  foreignKey: 'story_id'
});

// Post associations
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Day associations
Day.hasMany(Expense, {
  foreignKey: 'day_id'
});

Expense.belongsTo(Day, {
  foreignKey: 'day_id'
});




module.exports = {
  Comment,
  Expense,
  Day,
  Place,
  Post,
  Story,
  Trip,
  User,
  UserTrip
};