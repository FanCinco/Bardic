const router = require('express').Router();
const { Place, Trip, User, UserTrip } = require('../models');
//insert cons for password package


//get all Place 

router.get('/', (req, res) => {
  console.log(req.session);
  console.log('======================');
  Place.findAll({
    attributes: [
      'id',
      'name',
    ],
    include: {
      model: Trip,
      attributes: [
        'id',
        'title',
        'place_id'
      ],
      include: {
        model: UserTrip,
        attributes: [ 'user_id', 'trip_id' ],
        include: {
          model: User,
          attributs: [ 'firstName', 'lastName' ]
        }
      }
    }
  })
    .then(dbPlaceData => {
      const places = dbPlaceData.map(place => place.get({ plain: true }));

      User.findAll()
        .then(dbUserData => {
          const users = dbUserData.map(user => user.get({ plain: true }));
          res.render('places', { places, users, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// edit Place 

router.get('/edit/:id', (req, res) => {
  Place.findByPk(req.params.id, {
    attributes: [
      'id',
      'name',
      // 'created_at',
    ],
    
  })
    .then(dbPlaceData => {
      if (dbPlaceData) {
        const place = dbPlaceData.get({ plain: true });

        res.render('edit-place', { place, loggedIn: true });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;






















































