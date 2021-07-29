const router = require('express').Router();

const apiRoutes = require('./api/');
const homePageRoutes = require('./homepage-routes.js');
const storiesRoutes = require('./storiesTab-routes.js');
const placesRoutes = require('./placesTab-routes.js');
const expensesRoutes = require('./expensesTab-routes.js');

router.use('/', homePageRoutes);
router.use('/stories', storiesRoutes);
router.use('/places', placesRoutes);
router.use('/expenses', expensesRoutes);
router.use('/api', apiRoutes);

module.exports = router;
