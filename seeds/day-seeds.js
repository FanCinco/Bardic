const { Day } = require('../models');

const dayData = [
    {
        date: '06/27/2021',
        trip_id: 1
    },
    {
        date: '06/28/2021',
        trip_id: 1
    },
    {
        date: '06/29/2021',
        trip_id: 1
    },
    {
        date: '08/03/2020',
        trip_id: 2
    },
    {
        date: '08/05/2020',
        trip_id: 2
    },
    {
        date: '11/11/2020',
        trip_id: 3
    }
];

const seedDays = () => Day.bulkCreate(dayData);

module.exports = seedDays;