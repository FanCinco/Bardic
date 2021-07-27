const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, DailyExpense, Day, Place, Post, Story, Trip, User, userTrip } = require('../models');
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
            const expenses = dbExpensesData.map(expenses => expenses.get({ plain: true }));
            res.render('expenses', { expenses, loggedIn: true });
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
            'description',
            'cost',
            'day_id',
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
                const expenses = dbExpensesData.get({ plain: true });

                res.render('edit-story', { expenses, loggedIn: true });
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

