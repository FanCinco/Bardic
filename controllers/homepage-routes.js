const router = require('express').Router();
const sequelize = require('../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');
//insert cons for password package


// login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  module.exports = router;