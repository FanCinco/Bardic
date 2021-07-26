const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Places, Stories, Expenses, Users, Vote } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Trips.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE stories.id = vote.stories_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbTripsData => res.json(dbTripsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Trips.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE stories.id = vote.stories_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbTripsData => {
            if (!dbTripsData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbTripsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Trips.create({
        title: req.body.title,
        user_id: req.session.user_id
    })
        .then(dbTripsData => res.json(dbTripsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Trips.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbTripsData => {
            if (!dbTripsData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbTripsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Trips.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbTripsData => {
            if (!dbTripsData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbTripsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
