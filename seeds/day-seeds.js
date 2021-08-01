const { Day } = require('../models');

const dayData = [
    {
        date: '2021-06-27',
        trip_id: 1
    },
    {
        date: '2021-06-28',
        trip_id: 1
    },
    {
        date: '2021-06-29',
        trip_id: 1
    },
    {
        date: '2020-08-03',
        trip_id: 2
    },
    {
        date: '2020-08-05',
        trip_id: 2
    },
    {
        date: '2020-11-11',
        trip_id: 3
    }
];

const seedDays = () => Day.bulkCreate(dayData);

module.exports = seedDays;