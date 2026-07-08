const subscriptionRepository =
    require('../repositories/subscriptionRepository');
const redis =
    require(
        '../config/redis'
    );

const ownerTypes = {
    COMPANY: 'COMPANY',
    CANDIDATE: 'CANDIDATE'
};

const getCachedSubscription =
async (
    ownerId,
    ownerType
) => {

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
                ownerId,
                ownerType
            );

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

const hasFeature =
async (
    ownerId,
    ownerType,
    featureName
) => {

    const subscription =
    await getCachedSubscription(
        ownerId,
        ownerType
    );
    

    if (!subscription) {
        return false;
    }

    return Boolean(
        subscription.features?.[
            featureName
        ]
    );
};

const canUsePremiumAnalytics =
async (ownerId,ownerType) => {

    return await hasFeature(
        ownerId,
        ownerType,
        'premiumAnalytics'
    );
};

const canCompanyUsePremiumAnalytics =
async (
    companyId
) => {

    return await hasFeature(

        companyId,

        ownerTypes.COMPANY,

        'premiumAnalytics'
    );
};

const getCompanyMaxJobsAllowed =
async (
    companyId
) => {

    return await getMaxJobsAllowed(

        companyId,

        ownerTypes.COMPANY
    );
};

const canPersonalUsePriorityApplications =
async (
    userId
) => {

    return await hasFeature(

        userId,

        ownerTypes.CANDIDATE,

        'priorityApplications'
    );
};

const canUsePriorityApplications =
async (ownerId,ownerType) => {

    return await hasFeature(
        ownerId,
        ownerType,
        'priorityApplications'
    );
};

const getMaxJobsAllowed =
async (ownerId,ownerType) => {

    console.log(
    "OWNER:",
    ownerId,
    ownerType
);
    const subscription =
    await getCachedSubscription(
        ownerId,ownerType
    );
console.log(
    "SUBSCRIPTION:",
    subscription
);

    if (!subscription) {
        return 0;
    }
    console.log(
    "FEATURES:",
    subscription?.features
);
    return (
        subscription.features?.maxJobs
        || 0
    );
};

const canCreateJob =
async (
    ownerId,
    ownerType,
    currentJobCount
) => {

    const maxJobs =
        await getMaxJobsAllowed(
            ownerId,
            ownerType
        );

    return (
        currentJobCount < maxJobs
    );
};

const canPersonalUsePremiumAnalytics =
async (
    userId
) => {

    return await hasFeature(

        userId,

        ownerTypes.CANDIDATE,

        'premiumAnalytics'
    );
};

const canCompanyUsePriorityListing =
async (
    companyId
) => {

    return await hasFeature(

        companyId,

        ownerTypes.COMPANY,

        'priorityListing'
    );
};

module.exports = {
    hasFeature,
    canUsePremiumAnalytics,
    canUsePriorityApplications,
    getMaxJobsAllowed,
    canCreateJob,
    canCompanyUsePremiumAnalytics,
    canPersonalUsePriorityApplications,
    getCompanyMaxJobsAllowed,
    canPersonalUsePremiumAnalytics,
    canCompanyUsePriorityListing
};