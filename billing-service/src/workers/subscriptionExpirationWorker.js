const subscriptionRepository =
    require('../repositories/subscriptionRepository');

const subscriptionStatus =
    require('../constants/subscriptionStatus');
const {
    publishEvent
} = require(
    '../events/eventPublisher'
);

const eventTypes =
    require(
        '../events/eventTypes'
    );
const runExpirationCheck =
async () => {

    const expiredSubscriptions =
        await subscriptionRepository
        .getExpiredSubscriptions();

    for (
        const subscription
        of expiredSubscriptions
    ) {

        await subscriptionRepository
            .updateSubscriptionStatus(

                subscription.id,

                subscriptionStatus.EXPIRED
            );

        await publishEvent(

        eventTypes
            .SUBSCRIPTION_EXPIRED,

        {

            subscriptionId:
                subscription.id,

            ownerId:
                subscription.owner_id,

            ownerType:
        subscription.owner_type
        }
    );

        console.log(
            `Expired subscription ${subscription.id}`
        );
    }
};

module.exports = {
    runExpirationCheck
};