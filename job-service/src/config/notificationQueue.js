require('dotenv').config();

const { Queue } =
    require('bullmq');

const Redis =
    require('ioredis');

const connection =
    new Redis({

        host:
            process.env.REDIS_HOST,

        port:
            process.env.REDIS_PORT,

        maxRetriesPerRequest:
            null

    });

const notificationQueue =
    new Queue(

        'notifications',

        { connection }

    );

module.exports =
    notificationQueue;