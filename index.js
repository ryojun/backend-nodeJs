const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const expresssSession = require('express-session');
const { check, validationResult } = require('express-validator/check');
const routes = require('./routes');
const PORT =  3000;

//ตั้งค่า session สำหรับระบบ
server.use(expresssSession({
    secret: 'ryojun',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));


//ตั้งค่าการ Parse ตัวแปรเมื่อ client ส่งข้อมูลเข้ามา
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// สร้าง custom function
server.use(require('./configs/middlewaer'));

//เรียกใช้งาน routes
server.use('/api',routes);

server.get('*', (req,res)=>{
    res.end(`<h1>Backend server is start</h1> Session is ${req.session.me}`);
});
server.listen(PORT,() => console.log(`Server is Started. Port ${PORT}.`))