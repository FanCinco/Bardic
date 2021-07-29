const router = require('express').Router();
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
router.get('/', (req, res) => {
  res.render('homepage');
});

  module.exports = router;