const router = require('express').Router();
const { Day, Expense, Trip, UserTrip } = require('../../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Trip.findAll()
        .then(dbTripData => res.json(dbTripData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Trip.findOne(
        {
            where: {
                id: req.params.id
            },
            include: {
                model: Day,
                include: {
                    model: Expense
                }
            }
        }
    )
        .then(dbTripData => {
            if (!dbTripData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbTripData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Trip.create({
        title: req.body.title,
        place_id: req.body.place_id,
    })
    // Now we generate the usertrips in bulk
        .then(trip => {
            if (typeof req.body.user_ids === 'number') req.body.user_ids = [req.body.user_ids];
            const userTripArr = req.body.user_ids.map(user_id => {
                return {
                    user_id,
                    trip_id: trip.id
                }
            });
            return UserTrip.bulkCreate(userTripArr);
        })
        .then(usertripIds => res.status(200).json(usertripIds))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Trip.update(
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
        .then(dbTripData => {
            if (!dbTripData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbTripData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Trip.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbTripData => {
            if (!dbTripData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbTripData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
