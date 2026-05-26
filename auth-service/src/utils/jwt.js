const jwt = require('jsonwebtoken');

const ROLES =
    require('../config/roles');

function generateAccessToken(user) {

    return jwt.sign(

        {
            userId: user.userId,

            companyId: user.companyId,

            role: user.role,

            permissions:
                ROLES[user.role]||[]
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn:
                process.env.ACCESS_TOKEN_EXPIRES
        }
    );
}

function generateRefreshToken(user) {

    return jwt.sign(

        {
            userId: user.userId
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn:
                process.env.REFRESH_TOKEN_EXPIRES
        }
    );
}

function verifyAccessToken(token) {

    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );
}

function verifyRefreshToken(token) {

    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    );
}

module.exports = {

    generateAccessToken,

    generateRefreshToken,

    verifyAccessToken,

    verifyRefreshToken
};