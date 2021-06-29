const router = require('express').Router();
const service = require('../services/equipment');
const { check, validationResult } = require('express-validator/check');
const base64Img = require('base64-img');
const fs = require('fs');
const path = require('path');
const uploadDir = path.resolve('uploads');
const equipDir = path.join(uploadDir ,'equipments');

router.get('/',(req,res) => {
    res.json({message: 'Equipment Page GET'})
});

// เพิ่มข้อมูล
router.post('/',[
    check('eq_name').not().isEmpty(),
    check('eq_image').not().isEmpty()
], async (req,res) => {
    try {
        req.validate();
        //ตรวจสอบ Folder ท่าไม่มีก็ทำการสร้างใหม่
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        if (!fs.existsSync(equipDir)) fs.mkdirSync(equipDir);
        // แปลงข้อมูลรูปภาพเป็น Base64
        req.body.eq_image = base64Img.imgSync(req.body.eq_image, equipDir, `equip-${Date.now()}`).replace(`${equipDir}\\`, '');

        res.json({ message: await service.onCreate(req.body)});
    }
    catch (ex) {
        // หากว่ามีการ Insert ไม่สำเร็จ ให้ทำการลบภาพที่ Upload ทิ้ง ไม่เก็บเอาไว้
        const delImg = path.join(equipDir, req.body.eq_image);
        
        if(fs.existsSync(delImg)) fs.unlinkSync(delImg)
        res.error(ex);
    }
    
});

// ลบข้อมูลอุปกรณ์
router.delete('/:id', async (req,res) => {
    try{
        const item = await service.findOne({ eq_id: req.params.id })
        if (!item) throw new Error('Not found item.');
        const deleteitem = await service.onDelete(item.eq_id);
        const deleteImg = path.join(equipDir, item.eq_image); 
        if (fs.existsSync(deleteImg)) fs.unlinkSync(deleteImg)
        res.send(deleteitem);
    }
    catch (ex) { res.error(ex); }
});

// แก้ไขข้อมูลอุปกรณ์
router.put('/:id',[
    check('eq_name').not().isEmpty(),
    check('eq_image').not().isEmpty()
], async (req,res) => {
    try {
        req.validate();
        // หาตำแหน่งข้อมูลที่จะทำการแก้ไข
        const item = await service.findOne({ eq_id: req.params.id })
        if (!item) throw new Error('Not found item.');
        //ตรวจสอบ Folder ท่าไม่มีก็ทำการสร้างใหม่
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        if (!fs.existsSync(equipDir)) fs.mkdirSync(equipDir);
        // แปลงข้อมูลรูปภาพเป็น Base64
        req.body.eq_image = base64Img.imgSync(req.body.eq_image, equipDir, `equip-${Date.now()}`).replace(`${equipDir}\\`, '');
        
        const updateItem = await service.onUpdate(req.params.id, req.body);
        //ตรวจสอบว่าการแก้ไขสำเร็จหรือไม่ หากสำเร็จจะทำการลบรูปภาพเก่า
        if(updateItem.affectedRows >0) {
            const deleteImg = path.join(equipDir, item.eq_image); 
            if (fs.existsSync(deleteImg)) fs.unlinkSync(deleteImg)
        }
        res.json(updateItem);
    }
    catch (ex) { res.error(ex); }
});
module.exports = router;