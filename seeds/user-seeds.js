const { User } = require('../models');

const userData = [
    {
        firstName: 'George',
        lastName: 'Michael',
        email: 'gomich@gmail.com',
        password: "$2b$12$w4D52/RpJItUDjyG9I5txO1yr3HSZZvcxjl6EiXWdneW3BptJC5BW"
    },
    {
        firstName: 'Havier',
        lastName: 'Martinez',
        email: 'hart@yahoo.ca',
        password: '$2b$12$w4D52/RpJItUDjyG9I5txO1yr3HSZZvcxjl6EiXWdneW3BptJC5BW'
    },
    {
        firstName: 'Miranda',
        lastName: 'Shumacher',
        email: 'schum@hotmail.com',
        password: '$2b$12$w4D52/RpJItUDjyG9I5txO1yr3HSZZvcxjl6EiXWdneW3BptJC5BW'
    },
    {
        firstName: 'Tina',
        lastName: 'Bernette',
        email: 'pyrrhic@outlook.com',
        password: '$2b$12$w4D52/RpJItUDjyG9I5txO1yr3HSZZvcxjl6EiXWdneW3BptJC5BW'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;