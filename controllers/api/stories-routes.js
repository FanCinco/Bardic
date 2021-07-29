const router = require('express').Router();
const { Comments, Story, Trips, User, UserTrip } = require('../../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Story.findAll({
        attributes: [
            'id',
            'title',
            'startingText',
            'trip_id',
            'place_id',
            'user_id',
            'created_at',
        ],
        // include: [
        //     // {
        //     //     model: User,
        //     //     attributes: ['username']
        //     // },
        //     {
        //         model: Comments,
        //         attributes: ['id', 'title', 'startingText', 'trip_id', 'place_id', 'created_at'],
        //         include: {
        //           model: User,
        //           attributes: ['username']
        //         }
        //       },
        // ]
        
    })
        .then(dbStoryData => res.json(dbStoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Story.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'startingText',
            'trip_id',
            'place_id',
            'user_id',
            'created_at',
        ],
        // include: [
        //     // {
        //     //     model: User,
        //     //     attributes: ['username']
        //     // },
        //     {
        //         model: Comments,
        //         attributes: ['id', 'title', 'startingText', 'trip_id', 'place_id', 'created_at'],
        //         include: {
        //           model: User,
        //           attributes: ['username']
        //         }
        //       },
        // ]
    })
        .then(dbStoryData => {
            if (!dbStoryData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbStoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Story.create({
        title: req.body.title,
        startingText: req.body.startingText,
        trip_id: req.body.trip_id,
        place_id: req.body.place_id,
        user_id: req.session.user_id
    })
        .then(dbStoryData => res.json(dbStoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Story.update(
        {
            title: req.body.title,
            startingText: req.body.startingText,
            // trip_id: req.body.trip_id,
            // place_id: req.body.place_id,
            // user_id: req.body.user_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbStoryData => {
            if (!dbStoryData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbStoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Story.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbStoryData => {
            if (!dbStoryData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbStoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
