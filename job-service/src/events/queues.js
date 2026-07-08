const { Queue } =
    require('bullmq');

const redis =
    require('../config/redis');

const notificationQueue =
    new Queue(
        'notificationQueue',
        {
            connection:
                redis
        }
    );

const analyticsQueue =
    new Queue(

        'analyticsQueue',

        {
            connection: redis
        }
    );

module.exports = {
    notificationQueue,
    analyticsQueue
};