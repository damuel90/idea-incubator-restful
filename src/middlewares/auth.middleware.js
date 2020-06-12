const { verify } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { ErrorHelper } = require('../helpers');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        throw new ErrorHelper(401, 'Token must be sent');
    }

    verify(token, JWT_SECRET, function(err, decodedToken){
        if(err){
            throw new ErrorHelper(401, 'Invalid token');
        }

        req.user = decodedToken.user;
        next()
    });
}
