const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Places.findAll({
      attributes: [
        'id',
        'place',
        'description',
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
        'place',
        'description',
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
    places: req.body.places,
    description: req.body.description,
    user_id: req.session.user_id
  })
    .then(dbPlacesData => res.json(dbPlacesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// voting

//review!!!

router.put('/upvote', (req, res) => {
    Places.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Places, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




// router.put('/:id', withAuth, (req, res) => {
//   Post.update(
//     {
//       title: req.body.title
//     },
//     {
//       where: {
//         id: req.params.id
//       }
//     }
//   )
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });





// router.delete('/:id', withAuth, (req, res) => {
//   console.log('id', req.params.id);
//   Post.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
