const { User } = require('../models');

const userData = [
    {
        firstName: 'Justin',
        lastName: 'Weicht',
        email: 'justinweicht11@gmail.com',
        password: '$2b$12$0dHi6mBSkMU3mkWEjjPiz.YzOwUc9RHCWvhq0dJE8eALahdUO0ubW'
    },
    {
        firstName: 'Kiefer',
        lastName: 'Levine',
        email: 'kiefer_8@hotmail.com',
        password: '$2b$12$0jgWhrq52d.nhtYlARflH.E/ueMDEbIo0Sj5tlu1Eipv8pVdCCVj.'
    },
    {
        firstName: 'Said',
        lastName: 'Hadad',
        email: 'saiddavid.hadad@gmail.com',
        password: '$2b$12$TSiJ.VI/48UcfHMnJO840.ea9YrjkmzdbZewScbka3VWi9HpwrUEW'
    },
    {
        firstName: 'Francisco',
        lastName: 'Puma',
        email: 'francis_pancho12@hotmail.com',
        password: '$2b$12$XqWO8yhw9hOJfoduT9KUseNVzYBEjqz29XLLYWeyEbgDV3QQ6FhY6'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;