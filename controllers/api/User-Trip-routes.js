const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Places, Stories, Expenses, Users, Vote } = require('../models');
//insert cons for password package


// // get all 
// router.get('/', (req, res) => {
//     console.log('======================');
//     Comments.findAll({
//         attributes: [
//             'id',
//             'content',
//             'created_at',
//             //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE stories.id = vote.stories_id)'), 'vote_count']
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//         .then(dbCommentsData => res.json(dbCommentsData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });



// //get one

// router.get('/:id', (req, res) => {
//     Comments.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             'id',
//             'content',
//             'created_at',
//             //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE stories.id = vote.stories_id)'), 'vote_count']
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//         .then(dbCommentsData => {
//             if (!dbCommentsData) {
//                 res.status(404).json({ message: 'No matching data found with this id' });
//                 return;
//             }
//             res.json(dbCommentsData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });





// // create new entries


// router.post('/', (req, res) => {
//     Comments.create({
//         content: req.body.content,
//         user_id: req.session.user_id,
//         post_id: req.body.post_id
//     })
//         .then(dbCommentsData => res.json(dbCommentsData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });


// // Update 

// router.put('/:id', (req, res) => {
//     Comments.update(
//         {
//             title: req.body.title
//         },
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     )
//         .then(dbCommentsData => {
//             if (!dbCommentsData) {
//                 res.status(404).json({ message: 'No matching data found with this id' });
//                 return;
//             }
//             res.json(dbCommentsData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });



// //delete


// router.delete('/:id', (req, res) => {
//     console.log('id', req.params.id);
//     Comments.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbCommentsData => {
//             if (!dbCommentsData) {
//                 res.status(404).json({ message: 'No matching data found with this id' });
//                 return;
//             }
//             res.json(dbCommentsData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// module.exports = router;
