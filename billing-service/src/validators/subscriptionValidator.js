const {
    body,
    param
} = require(
    'express-validator'
);

const purchaseSubscriptionValidator = [

    body('planId')

        .notEmpty()

        .withMessage(
            'Plan ID is required'
        )

        .isUUID()

        .withMessage(
            'Invalid plan ID'
        )

];

const subscriptionIdValidator = [

    param('id')

        .isUUID()

        .withMessage(
            'Invalid subscription ID'
        )

];

module.exports = {

    purchaseSubscriptionValidator,
    subscriptionIdValidator

};