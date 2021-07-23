const router = require('express').Router();
const sequelize = require('../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');
//insert cons for password package


//get all expenses 

router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================');
    Expenses.findAll({
        // where: {
        //   user_id: req.session.user_id
        // },
        attributes: [
            'id',
            'expense',
            'dollar_amount',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE place.id = vote.place_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbExpensesData => {
            const expense = dbExpensesData.map(expense => expense.get({ plain: true }));
            res.render('expenses', { expense, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit expenses

router.get('/edit/:id', (req, res) => {
    Expenses.findByPk(req.params.id, {
        attributes: [
            'id',
            'expense',
            'dollar_amount',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE place.id = vote.place_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbExpensesData => {
            if (dbExpensesData) {
                const expense = dbExpensesData.get({ plain: true });

                res.render('edit-story', { expense, loggedIn: true });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;

