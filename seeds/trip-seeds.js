const { Trip } = require('../models');

const tripData = [
    {
        title: 'Visiting Austin, Texas',
        place_id: 1
    },
    {
        title: "This year's trip to Montreal",
        place_id: 2
    },
    {
        title: 'London, Our Way',
        place_id: 3
    }
];

const seedTrips = () => Trip.bulkCreate(tripData);

module.exports = seedTrips;