const router = require('express').Router();
const { Comment } = require('../../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Comment.update(req.body,
        {
            where: {
                id: req.params.id
            },
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        }
    )
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
