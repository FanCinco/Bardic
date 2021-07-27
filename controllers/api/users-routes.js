const router = require('express').Router();
const { Comments, Expenses, Day, Places, Posts, Stories, Trips, User, userTrip } = require('../models');
//insert cons for password package

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Comments,
        attributes: [
          'id',
          'content',
          'post_id',
          'user_id',
          'created_at']
      },
      {
        model: Expenses,
        attributes: [
          'id',
          'description',
          'cost',
          'day_id',
          'created_at']
      },
      {
        model: Day,
        attributes: [
          'id',
          'date',
          'trip_id',
          'created_at']
      },
      {
        model: Places,
        attributes: [
          'id',
          'name',
          'created_at']
      },
      {
        model: Posts,
        attributes: [
          'id',
          'content',
          'user_id',
          'story_id',
          'created_at']
      },
      {
        model: Stories,
        attributes: [
          'id',
          'title',
          'starting text',
          'trip_id',
          'place_id',
          'created_at']
      },
      {
        model: Trips,
        attributes: [
          'id',
          'title',
          'place_id',
          'created_at']
      },
      {
        model: User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'password',
          'created_at']
      },
      {
        model: userTrip,
        attributes: [
          'id',
          'user_id',
          'trip_id',
          'created_at']
      },
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create user

router.post('/', (req, res) => {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login

router.post('/login', (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with this email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

//logout

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

//update user 

router.put('/:id', (req, res) => {

  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete user

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;