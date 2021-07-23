const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Expenses.findAll({
        attributes: [
            'id',
            'expenses',
            'dollar_amount',
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
            'expenses',
            'dollar_amount',
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
        expenses: req.body.expenses,
        dollar_amount: req.body.dollar_amount,
        user_id: req.session.user_id
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
            title: req.body.expenses
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
