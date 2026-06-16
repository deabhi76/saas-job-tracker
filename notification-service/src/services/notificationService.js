const notificationRepository =
    require(
        '../repositories/notificationRepository'
    );

async function createNotification(
    data
) {

    return await notificationRepository
        .createNotification(
            data
        );

}

async function getNotifications(
    userId
) {

    return await notificationRepository
        .getNotificationsByUserId(
            userId
        );

}

async function markNotificationAsRead(

    notificationId,

    userId

) {

    const notification =
        await notificationRepository
            .markAsRead(

                notificationId,

                userId

            );

    if (!notification) {

        throw new Error(
            'Notification not found'
        );

    }

    return notification;

}

async function getUnreadCount(
    userId
) {

    return await notificationRepository
        .getUnreadCount(
            userId
        );

}

module.exports = {

    createNotification,

    getNotifications,

    markNotificationAsRead,
    getUnreadCount

};