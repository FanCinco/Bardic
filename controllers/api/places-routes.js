const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comments, Expenses, Day, Place, Posts, Stories, Trips, User, UserTrip } = require('../../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Place.findAll({
      attributes: [
        'id',
        'name'
      ],
      
    })
    .then(dbPlaceData => res.json(dbPlaceData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



//get one

router.get('/:id', (req, res) => {
    Place.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
        'id',
        'name'
      ],
    
  })
    .then(dbPlaceData => {
      if (!dbPlaceData) {
        res.status(404).json({ message: 'No matching data found with this id' });
        return;
      }
      res.json(dbPlaceData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// create new entries
router.post('/', (req, res) => {
  Place.create({
    name: req.body.name,
    user_id: req.session.user_id
  })
    .then(dbPlaceData => res.json(dbPlaceData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Update 

router.put('/:id', (req, res) => {
  Place.update(
    {
      name: req.body.name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPlaceData => {
      if (!dbPlaceData) {
        res.status(404).json({ message: 'No matching data found with this id' });
        return;
      }
      res.json(dbPlaceData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



//delete


router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Place.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPlaceData => {
      if (!dbPlaceData) {
        res.status(404).json({ message: 'No matching data found with this id' });
        return;
      }
      res.json(dbPlaceData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});






// voting
//REVIEW!!!

router.put('/upvote', (req, res) => {
  Place.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Place, User })
  .then(updatedVoteData => res.json(updatedVoteData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});






module.exports = router;