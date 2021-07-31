const { User } = require('../models');

const userData = [
    {
        firstName: 'George',
        lastName: 'Michael',
        email: 'gomich@gmail.com',
        password: '$2b$12$0JkfxLstvWQUPVPsAeMXsOS9H8/h3xVCuQhJ4Tcu6tDq/o1ltGbVy'
    },
    {
        firstName: 'Havier',
        lastName: 'Martinez',
        email: 'hart@yahoo.ca',
        password: '$2b$12$0JkfxLstvWQUPVPsAeMXsOS9H8/h3xVCuQhJ4Tcu6tDq/o1ltGbVy'
    },
    {
        firstName: 'Miranda',
        lastName: 'Shumacher',
        email: 'schum@hotmail.com',
        password: '$2b$12$0JkfxLstvWQUPVPsAeMXsOS9H8/h3xVCuQhJ4Tcu6tDq/o1ltGbVy'
    },
    {
        firstName: 'Tina',
        lastName: 'Bernette',
        email: 'pyrrhic@outlook.com',
        password: '$2b$12$0JkfxLstvWQUPVPsAeMXsOS9H8/h3xVCuQhJ4Tcu6tDq/o1ltGbVy'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;