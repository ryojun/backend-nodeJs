const crypto = require('crypto');

module.exports = {
    pasworld_hash(pasworld){
        return crypto.createHash('sha1').update(pasworld).digest('hex');
    }
};