const seedUsers = require('./user-seeds');
const seedPlaces = require('./place-seeds');
const seedTrips = require('./trip-seeds');
const seedUserTrips = require('./userTrip-seeds');
const seedDays = require('./day-seeds');
const seedExpenses = require('./expenses-seeds');
const seedStories = require('./story-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedPlaces();
    console.log('\n----- PLACES SEEDED -----\n');
    await seedPlaces();
    console.log('\n----- PLACES SEEDED -----\n');
    await seedTrips();
    console.log('\n----- TRIPS SEEDED -----\n');
    await seedUserTrips();
    console.log('\n----- USERTRIPS SEEDED -----\n');
    await seedDays();
    console.log('\n----- DAYS SEEDED -----\n');
    await seedExpenses();
    console.log('\n----- EXPENSES SEEDED -----\n');
    await seedStories();
    console.log('\n----- STORIES SEEDED -----\n');
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    
    process.exit(0);
}

seedAll();