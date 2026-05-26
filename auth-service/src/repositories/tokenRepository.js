const {
    redisClient
} = require('../config/redis');

async function saveRefreshToken(
    token,
    userId
) {

    await redisClient.set(

        `refresh:${token}`,

        userId,

        {
            EX: 7 * 24 * 60 * 60
        }
    );
}

async function exists(token) {

    const result =
        await redisClient.get(
            `refresh:${token}`
        );

    return result !== null;
}

async function remove(token) {

    await redisClient.del(
        `refresh:${token}`
    );
}

module.exports = {

    saveRefreshToken,

    exists,

    remove
};