const {
    param
} = require(
    'express-validator'
);

const notificationIdValidator = [

    param('id')

        .isUUID()

        .withMessage(
            'Invalid notification ID'
        )

];

module.exports = {

    notificationIdValidator

};