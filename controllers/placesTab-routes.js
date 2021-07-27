const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comments, Expenses, Day, Places, Posts, Stories, Trips, User, userTrip } = require('../models');
//insert cons for password package


//get all places 

router.get('/', (req, res) => {
  console.log(req.session);
  console.log('======================');
  Places.findAll({
    // where: {
    //   user_id: req.session.user_id
    // },
    attributes: [
      'id',
      'name',
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
      const places = dbPlacesData.map(places => places.get({ plain: true }));
      res.render('places', { places, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// edit places 

router.get('/edit/:id', (req, res) => {
  Places.findByPk(req.params.id, {
    attributes: [
      'id',
      'name',
      'created_at',
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE placesid = vote.places_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPlacesData => {
      if (dbPlacesData) {
        const places = dbPlacesData.get({ plain: true });

        res.render('edit-places', { places, loggedIn: true });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;

























































