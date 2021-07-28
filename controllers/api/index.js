const router = require('express').Router();

const usersRoutes = require('./users-routes.js');
const placesRoutes = require('./places-routes');
const storiesRoutes = require('./stories-routes');
const expensesRoutes = require('./expenses-routes');
const commentsRoutes = require('./comments-routes');
const dayRoutes = require('./day-routes');
const postsRoutes = require('./posts-routes');
const tripsRoutes = require('./trips-routes');
const userTripsRoutes = require('./User-Trip-routes');

router.use('/users', usersRoutes);
router.use('/places', placesRoutes);
router.use('/stories', storiesRoutes);
router.use('/expenses', expensesRoutes);
router.use('/comments', commentsRoutes);
router.use('/days', dayRoutes);
router.use('/posts', postsRoutes);
router.use('/trips', tripsRoutes);
router.use('/userTrips', userTripsRoutes);

module.exports = router;
