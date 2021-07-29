const router = require('express').Router();
const { Expense } = require('../models');
//insert cons for password package


//get all Expense 

router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================');
    Expense.findAll({
        attributes: [
            'id',
            'description',
            'cost',
            'day_id',
            // 'created_at',
        ],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
        .then(dbExpenseData => {
            const expenses = dbExpenseData.map(expense => expense.get({ plain: true }));
            res.render('expenses', { expenses, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit Expense

router.get('/edit/:id', (req, res) => {
    Expense.findByPk(req.params.id, {
        attributes: [
            'id',
            'description',
            'cost',
            'day_id',
            // 'created_at',
        ],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
        .then(dbExpenseData => {
            if (dbExpenseData) {
                const expense = dbExpenseData.get({ plain: true });

                res.render('edit-story', { expense, loggedIn: true });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;

