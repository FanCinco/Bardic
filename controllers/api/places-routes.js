const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Places.findAll({
      attributes: [
        'id',
        'places',
        'description',
        'created_at',
        //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE places.id = vote.places_id)'), 'vote_count']
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPlacesData => res.json(dbPlacesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



//get one

router.get('/:id', (req, res) => {
    Places.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
        'id',
        'places',
        'description',
        'created_at',
        //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE places.id = vote.places_id)'), 'vote_count']
      ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPlacesData => {
      if (!dbPlacesData) {
        res.status(404).json({ message: 'No matching data found with this id' });
        return;
      }
      res.json(dbPlacesData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});





// create new entries


router.post('/', (req, res) => {
  Places.create({
    places: req.body.places,
    description: req.body.description,
    user_id: req.session.user_id
  })
    .then(dbPlacesData => res.json(dbPlacesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// voting
//review!!!

router.put('/upvote', (req, res) => {
    Places.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Places, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Update 

router.put('/:id', (req, res) => {
  Places.update(
    {
      title: req.body.places
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPlacesData => {
      if (!dbPlacesData) {
        res.status(404).json({ message: 'No matching data found with this id' });
        return;
      }
      res.json(dbPlacesData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



//delete


router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Places.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPlacesData => {
      if (!dbPlacesData) {
        res.status(404).json({ message: 'No matching data found with this id' });
        return;
      }
      res.json(dbPlacesData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
