const router = require('express').Router();
const { check } = require('express-validator/check');
const {onAddimage, onLoadImage} = require('../services/imagesmanager');

// หน้าลงทะเบียน
router.post('/addimage', [
    check('Image_Name').not().isEmpty(),
    check('Image_shortcode').not().isEmpty(),
    check('Ig_account').not().isEmpty(),
    check('Image_rank').not().isEmpty(),
    check('Image_Like').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();
        const created = await onAddimage(req.body);
        res.json(created);
    }
    catch (ex) {
        res.error(ex);
    }
});

router.post('/loadAllImage'
, async (req, res) => {
    try {
        const imageList = await onLoadImage(req.body);
        res.json(imageList);
    }
    catch (ex) {
        res.error(ex);
    }
});

module.exports = router;