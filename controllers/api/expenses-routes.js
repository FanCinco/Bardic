const router = require('express').Router();
const { Expense } = require('../../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Expense.findAll({
        attributes: [
            'id',
            'description',
            'cost',
            'day_id',
        ],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
        .then(dbExpenseData => res.json(dbExpenseData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Expense.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'description',
            'cost',
            'day_id',
        ],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
        .then(dbExpenseData => {
            if (!dbExpenseData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbExpenseData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Expense.create({
        description: req.body.description,
        cost: req.body.cost,
        day_id: req.body.day_id
    })
        .then(dbExpenseData => res.json(dbExpenseData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Expense.update(
        {
            description: req.body.description,
            cost: req.body.cost,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbExpenseData => {
            if (!dbExpenseData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbExpenseData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Expense.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbExpenseData => {
            if (!dbExpenseData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbExpenseData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
