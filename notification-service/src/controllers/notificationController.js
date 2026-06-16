const notificationService =
    require(
        '../services/notificationService'
    );

async function getNotifications(
    req,
    res,
    next
) {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const notifications =
            await notificationService
                .getNotifications(
                    userId
                );

        return res.json({

            success: true,

            count:
                notifications.length,

            data:
                notifications

        });

    } catch (err) {

        next(err);

    }

}

async function markAsRead(
    req,
    res,
    next
) {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const notification =
            await notificationService
                .markNotificationAsRead(

                    req.params.id,

                    userId

                );

        return res.json({

            success: true,

            data: notification

        });

    } catch (err) {

        next(err);

    }

}

async function getUnreadCount(
    req,
    res,
    next
) {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const count =
            await notificationService
                .getUnreadCount(
                    userId
                );

        return res.json({

            success: true,

            count

        });

    } catch (err) {

        next(err);

    }

}

module.exports = {

    getNotifications,

    markAsRead,

    getUnreadCount

};