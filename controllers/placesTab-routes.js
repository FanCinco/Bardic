const router = require('express').Router();
const { Place } = require('../models');
//insert cons for password package


//get all Place 

router.get('/', (req, res) => {
  console.log(req.session);
  console.log('======================');
  Place.findAll({
    attributes: [
      'id',
      'name',
      // 'created_at',
    ],
    
  })
    .then(dbPlaceData => {
      const places = dbPlaceData.map(place => place.get({ plain: true }));
      res.render('places', { places, loggedIn: true });
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

























































