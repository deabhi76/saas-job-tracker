const redis =
    require('redis');

const redisClient =
    redis.createClient();

redisClient.on(
    'error',

    err => {
        console.error(
            'Redis Error:',
            err
        );
    }
);

async function connectRedis() {

    await redisClient.connect();

    console.log(
        'Redis Connected'
    );
}

module.exports = {
    redisClient,
    connectRedis
};