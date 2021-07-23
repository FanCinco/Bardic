const router = require('express').Router();
const sequelize = require('../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');
//insert cons for password package


//get all places 

router.get('/', (req, res) => {
  console.log(req.session);
  console.log('======================');
  Place.findAll({
    // where: {
    //   user_id: req.session.user_id
    // },
    attributes: [
      'id',
      'place',
      'description',
      'created_at',
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE place.id = vote.place_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPlacesData => {
      const place = dbPlacesData.map(place => place.get({ plain: true }));
      res.render('dashboard', { place, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', (req, res) => {
  Place.findByPk(req.params.id, {
    attributes: [
      'id',
      'place',
      'description',
      'created_at',
//[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE place.id = vote.place_id)'), 'vote_count']
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
        const place = dbPlacesData.get({ plain: true });
        
        res.render('edit-place', {place, loggedIn: true});
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

























































