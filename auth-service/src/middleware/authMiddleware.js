const jwt = require('jsonwebtoken');
const {
    verifyAccessToken
} = require('../utils/jwt');

function verifyJWT(req, res, next) {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'No token provided'
            });
        }

        const token =
            authHeader.split(' ')[1];

        const decoded =
    verifyAccessToken(token);

        req.user = decoded;

        next();

    } catch (err) {

    if (
        err.name === 'TokenExpiredError'
    ) {

        return res.status(401).json({
            error: 'Access token expired'
        });
    }

    if (
        err.name === 'JsonWebTokenError'
    ) {

        return res.status(401).json({
            error: 'Invalid access token'
        });
    }

    return res.status(401).json({
        error: 'Authentication failed'
    });
}
}

module.exports = verifyJWT;