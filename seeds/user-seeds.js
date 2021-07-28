const { User } = require('../models');

const userData = [
    {
        firstName: 'George',
        lastName: 'Michael',
        email: 'gomich@gmail.com',
        password: 'secretsauce'
    },
    {
        firstName: 'Havier',
        lastName: 'Martinez',
        email: 'hart@yahoo.ca',
        password: 'password'
    },
    {
        firstName: 'Miranda',
        lastName: 'Shumacher',
        email: 'schum@hotmail.com',
        password: 'knockout'
    },
    {
        firstName: 'Tina',
        lastName: 'Bernette',
        email: 'pyrrhic@outlook.com',
        password: 'parmesans'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;