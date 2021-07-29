const router = require('express').Router();
const { Comment, Place, Post, Story, Trip, User, UserTrip } = require('../models');
//insert cons for password package


//get all Story 

router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================');
    Story.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Post,
                attributes: [
                    'id',
                    'content',
                    'story_id',
                    'user_id',
                    'created_at'
                ],
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'content',
                            'user_id',
                            'post_id',
                            'created_at'
                        ],
                        include: {
                            model: User,
                            attributes: ['firstName', 'lastName']
                        }
                    }
                ]
            }
        ]
    })
        .then(dbStoryData => {
            const stories = dbStoryData.map(story => story.get({ plain: true }));
            
            if (!req.session.loggedIn) {
                res.render('stories', { stories, loggedIn: req.session.loggedIn });
                return;
            }
            User.findOne({
                where: {
                    id: req.session.user_id
                },
                attributes: { exclude: 'password' },
                include: [
                    {
                      model: UserTrip,
                      attributes: [
                        'id',
                        'user_id',
                        'trip_id',
                        // 'created_at'
                      ],
                      include: {
                        model: Trip,
                        attributes: [
                          'id',
                          'title',
                          'place_id',
                          // 'created_at'
                        ]
                      },
                    },
                  ]
            })
                .then(dbUserData => {
                    const user = dbUserData.get({ plain: true });

                    res.render('stories', { stories, user, loggedIn: req.session.loggedIn });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                }); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single story
router.get('/:id', (req, res) => {
    Story.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributse: ['firstName', 'lastName']
            },
            {
                model: Post,
                attributes: [
                    'id',
                    'content',
                    'story_id',
                    'user_id',
                    'created_at'
                ],
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'content',
                            'user_id',
                            'post_id',
                            'created_at'
                        ],
                        include: {
                            model: User,
                            attributes: ['firstName', 'lastName']
                        }
                    }
                ]
            },
            {
                model: Trip,
                attributse: ['id', 'title']
            }
        ]
    })
        .then(dbStoryData => {
            const story = dbStoryData.get({ plain: true });

            if (!req.session.loggedIn) {
                res.render('single-story', { story, loggedIn: req.session.loggedIn });
                return;
            }
            User.findOne({
                where: {
                    id: req.session.user_id
                },
                attributes: { exclude: 'password' },
                include: [
                    {
                      model: UserTrip,
                      attributes: [
                        'id',
                        'user_id',
                        'trip_id',
                        // 'created_at'
                      ],
                      include: {
                        model: Trip,
                        attributes: [
                          'id',
                          'title',
                          'place_id',
                          // 'created_at'
                        ]
                      },
                    },
                  ]
            })
            .then(dbUserData => {
                const user = dbUserData.get({ plain: true });
                const editable = user.id === story.user_id;
                const canPost = user.usertrips.some(usertrip => story.trip_id === usertrip.trip_id);
                story.posts.forEach(post => {
                    if (post.user_id === user.id) {
                        post.canEdit = true;
                        return;
                    }
                    post.canEdit = false;
                });
                const canEditAPost = story.posts.some(post => post.canEdit);

                res.render('single-story', { story, user, editable, canPost, canEditAPost, loggedIn: req.session.loggedIn });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

