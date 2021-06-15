const router = require('express').Router();
const account = require('./account');
const imagesmanager = require('./imagesmanager');
//Account route
router.use('/account', account);
router.use('/imagesmanager', imagesmanager);

module.exports = router;