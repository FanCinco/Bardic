const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const placesRoutes = require('./places-routes');
const storiesRoutes = require('./stories-routes');
const expensesRoutes = require('./expenses-routes');

router.use('/users', userRoutes);
router.use('/places', placesRoutes);
router.use('/stories', storiesRoutes);
router.use('/expenses', expensesRoutes);

module.exports = router;
