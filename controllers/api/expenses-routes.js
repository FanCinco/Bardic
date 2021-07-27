const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comments, DailyExpense, Day, Place, Post, Story, Trip, User, userTrip } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Expenses.findAll({
        attributes: [
            'id',
            'description',
            'cost',
            'day_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE expenses.id = vote.expenses_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbExpensesData => res.json(dbExpensesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Expenses.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'description',
            'cost',
            'day_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE expenses.id = vote.expenses_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbExpensesData => {
            if (!dbExpensesData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbExpensesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Expenses.create({
        description: req.body.description,
        cost: req.body.cost,
        day_id: req.body.day_id
    })
        .then(dbExpensesData => res.json(dbExpensesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Expenses.update(
        {
            description: req.body.description,
            cost: req.body.cost,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbExpensesData => {
            if (!dbExpensesData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbExpensesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Expenses.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbExpensesData => {
            if (!dbExpensesData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbExpensesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
