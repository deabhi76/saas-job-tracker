const {
    notificationQueue
} = require('./queues');

const publishEvent =
async (
    eventType,
    payload
) => {

    await Promise.all([

        notificationQueue.add(
            eventName,
            payload,
            {

            removeOnComplete: 100,

            removeOnFail: 100
        }
        ),

        analyticsQueue.add(
            eventName,
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