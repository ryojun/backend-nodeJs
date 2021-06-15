const { Result } = require('express-validator');
const connection = require('../configs/database');

module.exports = {
    onAddimage(value){
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO foods_image SET ?',value,(error,result) =>{
                if (error) return reject(error);
                resolve(result);
            });
        });
    },
    onLoadImage(value) {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM foods_image', (error,result) => {
                if (error) return reject(error);
                if (result.length > 0) {
                    resolve(result);
                }
            })
        });
    }
};