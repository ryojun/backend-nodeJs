const crypto = require('crypto');

 const security = {
    pasworld_hash(pasworld){
        return crypto.createHash('sha1').update(pasworld).digest('hex');
    },
    password_verify(pasworld, pasworld_hash) {
        return security.pasworld_hash(pasworld) === pasworld_hash;
    }
};

module.exports = security;