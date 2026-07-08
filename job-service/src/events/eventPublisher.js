const {
    notificationQueue,
    analyticsQueue
} = require('./queues');

const publishEvent =
async (
    eventType,
    payload
) => {

    await Promise.all([

        notificationQueue.add(
            eventType,
            payload,
            {

            removeOnComplete: 100,

            removeOnFail: 100
        }
        ),

        analyticsQueue.add(
            eventType,
            payload,
            {

            removeOnComplete: 100,

            removeOnFail: 100
        }
        )
    ]);
};

module.exports = {
    publishEvent
};