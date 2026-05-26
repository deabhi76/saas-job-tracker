const {

    generateAccessToken,

    generateRefreshToken

} = require('../utils/jwt');

const tokenRepository =
    require('../repositories/tokenRepository');

async function createSession(user) {

    const accessToken =
        generateAccessToken(user);

    const refreshToken =
        generateRefreshToken(user);

    await tokenRepository
    .saveRefreshToken(
        refreshToken,
        user.userId
    );

    return {
        accessToken,
        refreshToken
    };
}

module.exports = {
    createSession
};