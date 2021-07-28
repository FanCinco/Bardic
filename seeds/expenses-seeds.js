const { Expense } = require('../models');

const expenseData = [
    {
        description: 'We bought lunch at a coffee shop.',
        cost: 28.37,
        day_id: 1
    },
    {
        description: 'We bought groceries. Eating out is expensive!',
        cost: 58.21,
        day_id: 1
    },
    {
        description: 'Month of Netflix',
        cost: 11.54,
        day_id: 1
    },
    {
        description: 'Went on the tour of haunted places.',
        cost: 99.89,
        day_id: 2
    },
    {
        description: 'Bought some gifts at the gift shop.',
        cost: 28.21,
        day_id: 2
    },
    {
        description: 'Paid for gas.',
        cost: 38.44,
        day_id: 3
    },
    {
        description: 'Train ticket.',
        cost: 19.56,
        day_id: 4
    },
    {
        description: 'Concert tickets.',
        cost: 182.45,
        day_id: 4
    },
    {
        description: 'Train ticket.',
        cost: 19.56,
        day_id: 5
    },
    {
        description: 'Bought tea and a scone.',
        cost: 14.50,
        day_id: 6
    },
    {
        description: 'Bought a hotdog at the museum.',
        cost: 8.90,
        day_id: 6
    },
    {
        description: 'Bus fare.',
        cost: 5.20,
        day_id: 6
    },
];

const seedExpenses = () => Expense.bulkCreate(expenseData);

module.exports = seedExpenses;