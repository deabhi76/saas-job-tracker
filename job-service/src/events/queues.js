const { Queue } = require("bullmq");
const bullRedis = require("../config/bullRedis");

const notificationQueue = new Queue("notificationQueue", {
    connection: bullRedis,
});

const analyticsQueue = new Queue("analyticsQueue", {
    connection: bullRedis,
});

module.exports = {
    notificationQueue,
    analyticsQueue,
};