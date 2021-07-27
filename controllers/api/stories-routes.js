const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comments, Expenses, Day, Places, Posts, Stories, Trip, User, userTrip } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Stories.findAll({
        attributes: [
            'id',
            'title',
            'startingText',
            'trip_id',
            'place_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE stories.id = vote.stories_id)'), 'vote_count']
        ],
        include: [
            // {
            //     model: User,
            //     attributes: ['username']
            // },
            {
                model: Comments,
                attributes: ['id', 'title', 'startingText', 'trip_id', 'place_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              },
        ]
        
    })
        .then(dbStoriesData => res.json(dbStoriesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Stories.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'startingText',
            'trip_id',
            'place_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE stories.id = vote.stories_id)'), 'vote_count']
        ],
        include: [
            // {
            //     model: User,
            //     attributes: ['username']
            // },
            {
                model: Comments,
                attributes: ['id', 'title', 'startingText', 'trip_id', 'place_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              },
        ]
    })
        .then(dbStoriesData => {
            if (!dbStoriesData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbStoriesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Stories.create({
        title: req.body.title,
        startingText: req.body.content,
        trip_id: req.body.trip_id,
        place_id: req.body.place_id,
    })
        .then(dbStoriesData => res.json(dbStoriesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Stories.update(
        {
            title: req.body.title,
            startingText: req.body.content,
            trip_id: req.body.trip_id,
            place_id: req.body.place_id,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbStoriesData => {
            if (!dbStoriesData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbStoriesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Stories.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbStoriesData => {
            if (!dbStoriesData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbStoriesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
