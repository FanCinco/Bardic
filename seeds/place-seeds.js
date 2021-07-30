const { Place } = require('../models');

const placeData = [
    {
        name: 'texas'
    },
    {
        name: 'montreal'
    },
    {
        name: 'london'
    }
];

const seedPlaces = () => Place.bulkCreate(placeData);

module.exports = seedPlaces;