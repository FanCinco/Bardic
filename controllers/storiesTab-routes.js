const router = require('express').Router();
const sequelize = require('../config/connection');
const { Places, Stories, Expenses, Users, Vote } = require('../models');
//insert cons for password package


//get all stories 

router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================');
    Stories.findAll({
        // where: {
        //   user_id: req.session.user_id
        // },
        attributes: [
            'id',
            'title',
            'content',
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
        .then(dbStoriesData => {
            const stories = dbStoriesData.map(stories => stories.get({ plain: true }));
            res.render('stories', { stories, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit stories

router.get('/edit/:id', (req, res) => {
    Stories.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE stories.id = vote.storiesid)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbStoriesData => {
            if (dbStoriesData) {
                const stories = dbStoriesData.get({ plain: true });

                res.render('edit-stories', { stories, loggedIn: true });
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

