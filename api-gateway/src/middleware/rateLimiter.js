const rateLimit =
    require('express-rate-limit');

const {
    RedisStore
} = require('rate-limit-redis');

const {
    redisClient
} = require('../config/redis');

const rateLimiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        max: 1000,

        standardHeaders: true,

        legacyHeaders: false,

        message: {

            success: false,

            message:
                'Too many requests'

        },

        store: new RedisStore({

            sendCommand: (...args) =>
                redisClient.sendCommand(args)

        })

    });

module.exports =
    rateLimiter;