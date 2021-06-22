const crypto = require('crypto');

 const security = {
    pasworld_hash(pasworld){
        return crypto.createHash('sha1').update(pasworld).digest('hex');
    },
    password_verify(pasworld, pasworld_hash) {
        return security.pasworld_hash(pasworld) === pasworld_hash;
    },
    authenticated(req, res, next) {
        req.session.userLogin = {
            "u_id": 24,
            "u_username": "admin",
            "u_firstname": "Tanyaboon",
            "u_lastname": "Morinaga",
            "u_role": "admin"
        };
        try {
            if (req.session.userLogin.u_role == 'admin'){
                return next();
            }
            throw new Error('Unauthorize');
        }
        catch(ex) {
            res.error(ex, 401)
        }
    }
};

module.exports = security;