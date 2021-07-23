const router = require('express').Router();
const sequelize = require('../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');
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
            const story = dbStoriesData.map(story => story.get({ plain: true }));
            res.render('stories', { story, loggedIn: true });
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
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE story.id = vote.storyid)'), 'vote_count']
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
                const story = dbStoriesData.get({ plain: true });

                res.render('edit-story', { story, loggedIn: true });
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

