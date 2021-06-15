const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const {onRegister, onLogin} = require('../services/account');

// หน้าลงทะเบียน
router.post('/register', [
    check('u_username').not().isEmpty(),
    check('u_password').not().isEmpty(),
    check('u_firstname').not().isEmpty(),
    check('u_lastname').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();
        const created = await onRegister(req.body);
        res.json(created);
    }
    catch (ex) {
        res.error(ex);
    }
});

router.post('/login', [
    check('u_username').not().isEmpty(),
    check('u_password').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();
        const userLogin = await onLogin(req.body);
        res.json(req.body);
    }
    catch (ex) {
        res.error(ex);
    }
});

module.exports = router;