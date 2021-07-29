const { User } = require('../models');

const userData = [
    {
        firstName: 'George',
        lastName: 'Michael',
        email: 'gomich@gmail.com',
        password: '$2b$12$0dHi6mBSkMU3mkWEjjPiz.YzOwUc9RHCWvhq0dJE8eALahdUO0ubW'
    },
    {
        firstName: 'Havier',
        lastName: 'Martinez',
        email: 'hart@yahoo.ca',
        password: '$2b$12$0jgWhrq52d.nhtYlARflH.E/ueMDEbIo0Sj5tlu1Eipv8pVdCCVj.'
    },
    {
        firstName: 'Miranda',
        lastName: 'Shumacher',
        email: 'schum@hotmail.com',
        password: '$2b$12$TSiJ.VI/48UcfHMnJO840.ea9YrjkmzdbZewScbka3VWi9HpwrUEW'
    },
    {
        firstName: 'Tina',
        lastName: 'Bernette',
        email: 'pyrrhic@outlook.com',
        password: '$2b$12$XqWO8yhw9hOJfoduT9KUseNVzYBEjqz29XLLYWeyEbgDV3QQ6FhY6'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;