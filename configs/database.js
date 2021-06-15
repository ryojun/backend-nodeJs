const mysql = require('mysql');
const connection = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'neverend',
    database : 'foods_db',
    charset : 'utf8'
});

module.exports = connection;