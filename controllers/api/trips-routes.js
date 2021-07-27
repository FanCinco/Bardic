const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comments, Expenses, Day, Places, Posts, Story, Trip, User, userTrip } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Trips.findAll()
        .then(dbTripsData => res.json(dbTripsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Trips.findOne()
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
        place_id: req.body.place_id
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
            title: req.body.title,
            place_id: req.body.place_id
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
