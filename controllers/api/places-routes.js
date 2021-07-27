const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comments, Expenses, Day, Places, Posts, Stories, Trips, User, UserTrip } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Places.findAll({
      attributes: [
        'id',
        'name',
        'created_at',
        //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE places.id = vote.places_id)'), 'vote_count']
      ],
      
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
        'name',
        'created_at',
        //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE places.id = vote.places_id)'), 'vote_count']
      ],
    
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
    name: req.body.name,
    user_id: req.session.user_id
  })
    .then(dbPlacesData => res.json(dbPlacesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Update 

router.put('/:id', (req, res) => {
  Places.update(
    {
      places: req.body.places
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






// voting
//REVIEW!!!

router.put('/upvote', (req, res) => {
  Places.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Places, User })
  .then(updatedVoteData => res.json(updatedVoteData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});






module.exports = router;
