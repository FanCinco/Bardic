const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comments, Expenses, Day, Places, Posts, Stories, Trips, User, UserTrip } = require('../models');
//insert cons for password package


// login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


// Homepage
router.get('/homepage', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

  module.exports = router;