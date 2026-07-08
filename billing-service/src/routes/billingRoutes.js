const express =
    require('express');

const billingController =
    require('../controllers/billingController');

const validate =
    require(
        '../middleware/validationMiddleware'
    );

const {

    purchaseSubscriptionValidator,
    subscriptionIdValidator

} = require(
    '../validators/subscriptionValidator'
);

const router =
    express.Router();

    router.use((req,res,next)=>{

    console.log(
        "BILLING ROUTE:",
        req.method,
        req.originalUrl
    );

    next();

});

router.get(
    '/payments/me',
    billingController
        .getMyPayments
);

router.get(
    '/plans',
    billingController.getPlans
);

router.post(
    '/subscriptions',
    purchaseSubscriptionValidator,

    validate,

    billingController.purchaseSubscription
);

router.patch(
    '/subscriptions/:id/cancel',

    subscriptionIdValidator,

    validate,

    billingController.cancelSubscription
);

// router.get(
//     '/features/:ownerId',
//     billingController.getFeatures
// );

router.get(
    '/features/company',

    billingController
        .getCompanyFeatures
);

router.get(
    '/features/personal',

    billingController
        .getPersonalFeatures
);

router.get(
    '/subscriptions/me',
    billingController
        .getSubscription
);
module.exports = router;