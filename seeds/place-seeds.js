const { Place } = require('../models');

const placeData = [
    {
        name: 'Texas'
    },
    {
        name: 'Montreal'
    },
    {
        name: 'London'
    }
];

const seedPlaces = () => Place.bulkCreate(placeData);

module.exports = seedPlaces;