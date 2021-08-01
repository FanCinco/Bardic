const router = require('express').Router();
const { Day, Expense, Trip, User, UserTrip } = require('../models');
//insert cons for password package


//get all Expense 

router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================');

    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    User.findOne(
        {
            where: {
                email: req.session.email
            },
            attributes: { exclude: ['password'] },
            include: {
                model: UserTrip,
                include: {
                    model: Trip,
                    include: {
                        model: Day,
                        include: {
                            model: Expense
                        }
                    }
                }
            }
        }
    )
        .then(dbUserData => {
            const user = dbUserData.get({ plain: true });
            console.log(user.usertrips);
            res.render('expenses', { user, loggedIn: req.session.loggedIn });
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

