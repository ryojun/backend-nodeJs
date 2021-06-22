const router = require('express').Router();
const base64Img = require('base64-img');
const fs = require('fs');
const path = require('path');
const uploadDir = path.resolve('uploads');
const equipDir = path.join(uploadDir ,'equipments');

router.get('/',(req,res) => {
    res.json({message: 'Equipment Page GET'})
});

router.post('/',(req,res) => {
    try {
        //ตรวจสอบ Folder ท่าไม่มีก็ทำการสร้างใหม่
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        if (!fs.existsSync(equipDir)) fs.mkdirSync(equipDir);
        // แปลงข้อมูลรูปภาพเป็น Base64
        const filename = base64Img.imgSync(req.body.eq_image, equipDir, Date.now());
        res.json({message: filename})
    }
    catch (ex) {
        res.error(ex);
    }
    
});

module.exports = router;