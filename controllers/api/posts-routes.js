const router = require('express').Router();
const { Comment, Post, Stories, User } = require('../../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
            'id',
            'content',
            'user_id',
            'story_id',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['email']
            },
            {
                model: Comment,
                attributes: [
                    'id', 'content', 'user_id', 'post_id', 
                    // 'created_at'
                ],
                include: {
                  model: User,
                  attributes: ['email']
                }
              },
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'user_id',
            'story_id',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['email']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'user_id', 'post_id',
                //  'created_at'
                ],
                include: {
                  model: User,
                  attributes: ['email']
                }
              },
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Post.create({
        content: req.body.content,
        user_id: req.session.user_id,
        story_id: req.body.story_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Post.update(
        {
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
