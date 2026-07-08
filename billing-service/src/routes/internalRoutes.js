const express =
    require('express');

const router =
    express.Router();

const billingController =
    require(
        '../controllers/billingController'
    );

router.post(

    '/subscriptions',

    billingController
        .createInternalSubscription
);

module.exports =
    router;