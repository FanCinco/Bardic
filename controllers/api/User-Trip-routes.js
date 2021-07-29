const router = require('express').Router();
const { UserTrip } = require('../../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    UserTrip.findAll()
        .then(dbUserTripData => res.json(dbUserTripData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    UserTrip.findOne({
        where: {
            id: req.params.id
        },
    })
        .then(dbUserTripData => {
            if (!dbUserTripData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbUserTripData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    UserTrip.create({
        user_id: req.session.user_id,
        trip_id: req.body.trip_id
    })
        .then(dbUserTripData => res.json(dbUserTripData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    UserTrip.update({
            user_id: req.session.user_id,
            trip_id: req.body.trip_id
        },
        {
            where: {
                id: req.params.id
            },
        }
    )
        .then(dbUserTripData => {
            if (!dbUserTripData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbUserTripData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



// //delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    UserTrip.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserTripData => {
            if (!dbUserTripData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbUserTripData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
