const router = require('express').Router();
const {authenticated} = require('../configs/security')
const account = require('./account');

// Account route
router.use('/account', account);
// Equipment route
router.use('/equipment', authenticated, require('./equipment'));

module.exports = router;