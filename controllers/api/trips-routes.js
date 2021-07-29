const router = require('express').Router();
const { Trip } = require('../../models');
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
    Trip.findOne()
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
        place_id: req.body.place_id
    })
        .then(dbTripData => res.json(dbTripData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
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
