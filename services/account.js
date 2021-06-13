const { Result } = require('express-validator');
const connection = require('../configs/database');
const {pasworld_hash} = require('../configs/security')

module.exports = {
    onRegister(value){
        return new Promise((resolve, reject) => {
            value.u_password = pasworld_hash(value.u_password);
            connection.query('INSERT INTO tb_users SET ?',value,(error,result) =>{
                if (error) return reject(error);
                resolve(result);
            });
        });
    },
    onLogin(value) {
        return new Promise((resolve,reject) => {
            resolve(value);
        });
    }
};