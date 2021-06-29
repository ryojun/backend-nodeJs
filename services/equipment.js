const connection = require('../configs/database');
module.exports = {
    findOne(column) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tb_equipments WHERE ?', column, (error, result) => {
                if (error) return reject(error);
                resolve(result.length > 0 ? result[0] : null)
            })
        });
    },
    onCreate(value) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tb_equipments SET ?', value, (error,result) => {
                if (error) return reject(error);
                resolve(result)
            })
        });
    },
    onDelete(value) {
        return new Promise ((resolve, reject) => {
            connection.query('DELETE FROM tb_equipments WHERE eq_id=?', [value], (error, result) => {
                if (error) return reject(error);
                resolve(result)
            })
        });
    },
    onUpdate(id, value){
        return new Promise((resolve, reject) => {
            const $query = `
                UPDATE tb_equipments SET
                    eq_name = ?,
                    eq_detail =?,
                    eq_image = ?
                WHERE
                    eq_id = ?`;
            connection.query($query, [
                value.eq_name,
                value.eq_detail,
                value.eq_image,
                id
            ], (error,result) => {
                if (error) return reject(error);
                resolve(result)
            })
        });
    }
};