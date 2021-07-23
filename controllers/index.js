const router = require('express').Router();

const apiRoutes = require('./api/');
const homePageRoutes = require('./homepage-routes.js');
const storiesRoutes = require('./storiesTab-routes.js');
const placesRoutes = require('./placesTab-routes.js');
const expensesRoutes = require('./expensesTab-routes.js');

router.use('/', homePageRoutes);
router.use('/', storiesRoutes);
router.use('/', placesRoutes);
router.use('/', expensesRoutes);
router.use('/api', apiRoutes);

module.exports = router;
