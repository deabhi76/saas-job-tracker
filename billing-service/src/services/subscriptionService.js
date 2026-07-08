const { v4: uuidv4 } =
    require('uuid');

const planService =
    require('./planService');

const paymentService =
    require('./paymentService');

const subscriptionRepository =
    require('../repositories/subscriptionRepository');

const subscriptionStatus =
    require('../constants/subscriptionStatus');


const AppError =
    require('../utils/AppError');

const {
    publishEvent
} = require(
    '../events/eventPublisher'
);

const eventTypes =
    require(
        '../events/eventTypes'
    );
const redis =
    require(
        '../config/redis'
    );

const purchaseSubscription =
async ({
    ownerId,
    ownerType,
    companyAdminId,
    planId
}) => {


    const plan =
        await planService
        .getPlanById(
            planId
        );

    if (

    plan.owner_type !==
    ownerType

) {

    throw new AppError(

        'Invalid plan type',

        400
    );
}

    const existingSubscription =
        await subscriptionRepository
        .getActiveSubscription(
            ownerId,
            ownerType
        );

    if (existingSubscription) {

    if (

        existingSubscription.plan_id ===
        planId

    ) {

        throw new AppError(

            'Already subscribed to this plan',

            409
        );
    }

    return await upgradeSubscription({

        subscriptionId:
            existingSubscription.id,

        newPlanId:
            planId

    });
}

    

    const startDate =
        new Date();

    const endDate =
        new Date();

    endDate.setMonth(
        endDate.getMonth() + 1
    );

    const subscription =
        await subscriptionRepository
        .createSubscription({

            id: uuidv4(),

            ownerId,

            ownerType,

            planId,

            status:
                subscriptionStatus.PENDING,

            startDate,

            endDate,

            autoRenew: true
        });

        if (
    Number(plan.monthly_price) === 0
) {

    const activeSubscription =
        await subscriptionRepository
            .updateSubscriptionStatus(
                subscription.id,
                subscriptionStatus.ACTIVE
            );
            await redis.del(
    `subscription:${ownerType}:${ownerId}`
    );
    return activeSubscription;
}

    const paymentResult =
        await paymentService
        .createPayment({

            subscriptionId:
                subscription.id,

            amount:
                plan.monthly_price
        });

    if (paymentResult.success) {

    await publishEvent(

        eventTypes.PAYMENT_SUCCESS,

        {
            ownerId,
            ownerType,
            companyAdminId,
            subscriptionId: subscription.id,
            paymentId: paymentResult.payment.id,
            amount: plan.monthly_price
        }
    );

    const activeSubscription =
        await subscriptionRepository
            .updateSubscriptionStatus(

                subscription.id,

                subscriptionStatus.ACTIVE
            );

    await publishEvent(

        eventTypes.SUBSCRIPTION_CREATED,

        {
            subscriptionId: subscription.id,
            ownerId,
            ownerType,
            companyAdminId,
            planId
        }
    );

    await redis.del(
    `subscription:${ownerType}:${ownerId}`
    );

    return activeSubscription;
}

await publishEvent(

    eventTypes.PAYMENT_FAILED,

    {
        ownerId,
        ownerType,
        companyAdminId,
        subscriptionId: subscription.id,
        paymentId: paymentResult.payment.id,
        amount: plan.monthly_price
    }
);



return await
    subscriptionRepository
        .updateSubscriptionStatus(

            subscription.id,

            subscriptionStatus.CANCELLED
        );
};

const cancelSubscription =
async (
    subscriptionId,
    ownerId,
    ownerType,
    companyAdminId
) => {

    const subscription =
    await subscriptionRepository
        .getSubscriptionById(
            subscriptionId
        );

    if (!subscription) {

        throw new AppError(

            'Subscription not found',

            404
        );
    }

    if (

    Number(subscription.owner_id )!==
    Number(ownerId)||
    subscription.owner_type !== ownerType

) {

    throw new AppError(

        'Unauthorized',

        403
    );
}

if (

    subscription.status !==
    subscriptionStatus.ACTIVE

) {

    throw new AppError(

        'Only active subscriptions can be cancelled',

        400
    );
}

    const freePlan =
    await planService
        .getFreePlanByOwnerType(
            ownerType
        );

const updatedSubscription =
    await subscriptionRepository
        .updatePlan(
            subscriptionId,
            freePlan.id
        );

    await publishEvent(

        eventTypes
            .SUBSCRIPTION_CANCELLED,

        {
            ownerId:updatedSubscription.owner_id,
            ownerType: updatedSubscription.owner_type,
            companyAdminId,
            subscriptionId
        }
    );

    await redis.del(
    `subscription:${ownerType}:${ownerId}`
);

    return updatedSubscription;
};

const upgradeSubscription =
async ({
    subscriptionId,
    newPlanId
}) => {

    console.log(
    "UPGRADE SUBSCRIPTION HIT"
);

    const subscription =
        await subscriptionRepository
            .getSubscriptionById(
                subscriptionId
            );

    if (!subscription) {

        throw new AppError(
            'Subscription not found',
            404
        );
    }
    const plan =
    await planService
        .getPlanById(
            newPlanId
        );

if (!plan) {

    throw new AppError(
        'Plan not found',
        404
    );
}
if (

    plan.owner_type !==
    subscription.owner_type

) {

    throw new AppError(

        'Invalid plan type',

        400
    );
}

const paymentResult =
    await paymentService
        .createPayment({

            subscriptionId,

            amount:
                plan.monthly_price
        });

        console.log(
    "PAYMENT RESULT:",
    paymentResult
);

        if (!paymentResult.success) {

    throw new AppError(

        'Payment failed',

        400
    );
}

    const updatedSubscription =
        await subscriptionRepository
            .updatePlan(

                subscriptionId,

                newPlanId
            );

    await redis.del(
        `subscription:${subscription.owner_type}:${subscription.owner_id}`
    );

    return updatedSubscription;
};



const getSubscription =
async (ownerId,ownerType) => {

    const cacheKey =
        `subscription:${ownerType}:${ownerId}`;

    const cached =
        await redis.get(
            cacheKey
        );

    if (cached) {

        return JSON.parse(
            cached
        );
    }

    const subscription =
        await subscriptionRepository
            .getCurrentSubscriptionByOwner(
                ownerId,ownerType
            );

        console.log("FOUND SUBSCRIPTION:", subscription);

    if (subscription) {

        await redis.set(

            cacheKey,

            JSON.stringify(
                subscription
            ),

            'EX',

            300
        );
    }

    return subscription;
};

module.exports = {
    purchaseSubscription,
    cancelSubscription,
    upgradeSubscription,
    getSubscription
};