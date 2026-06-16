const express = require('express');

const router = express.Router();

const {
    getNotifications,
    getUnreadCount,
    markAsRead
} = require('../controllers/notificationController');

const validate =
    require(
        '../middleware/validationMiddleware'
    );

const {

    notificationIdValidator

} = require(
    '../validators/notificationValidator'
);


router.get(

    '/unread-count',

    getUnreadCount

);

router.patch(

    '/:id/read',

    notificationIdValidator,

    validate,

    markAsRead

);



router.get(
    '/',
    getNotifications
);

module.exports = router;