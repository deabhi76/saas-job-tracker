const planService =
    require('../services/planService');

const subscriptionService =
    require('../services/subscriptionService');
const asyncHandler=require('../utils/asyncHandler')
const featureAccessService =
    require('../services/featureAccessService');
const ownerTypes = require('../constants/ownerTypes');

const AppError=require('../utils/AppError')

const getPlans = async (
    req,
    res,
    next
) => {

    try {

        const role =
    req.headers[
        'x-user-role'
    ];

const ownerType =

    role === 'COMPANY_ADMIN'

        ? 'COMPANY'

        : 'CANDIDATE';

const plans =
    await planService
        .getPlansByOwnerType(
            ownerType
        );

        res.status(200).json({
            success: true,
            data: plans
        });

    } catch(error) {

        next(error);
    }
};

const purchaseSubscription =
async (
    req,
    res,
    next
) => {

    try {

        const role =
    req.headers[
        'x-user-role'
    ];

let ownerId;
let ownerType;
let companyAdminId = null;


       if (
    role === 'CANDIDATE'
) {

    ownerId =
        req.headers[
            'x-user-id'
        ];

    ownerType =
        'CANDIDATE';
}

else if (
    role ===
    'COMPANY_ADMIN'
) {

    ownerId =
        req.headers[
            'x-company-id'
        ];

    ownerType =
        'COMPANY';

    companyAdminId =
        req.headers[
            'x-user-id'
        ];
}

else if (
    role ===
    'RECRUITER'
) {

    ownerId =
        req.headers[
            'x-user-id'
        ];

    ownerType =
        ownerTypes.CANDIDATE;
}

        const {
            planId
        } = req.body;

        const subscription =
            await subscriptionService
            .purchaseSubscription({

                ownerId,
                ownerType,
                companyAdminId,
                planId
            });

        res.status(201).json({
            success: true,
            data: subscription
        });

    } catch(error) {

        next(error);
    }
};

const cancelSubscription =
async (
    req,
    res,
    next
) => {

    try {

        const { id } =
            req.params;

          const role =
    req.headers[
        'x-user-role'
    ];

let ownerId;
let ownerType;
let companyAdminId = null;


       if (
    role === 'CANDIDATE'
) {

    ownerId =
        req.headers[
            'x-user-id'
        ];

    ownerType =
        'CANDIDATE';
}

else if (
    role ===
    'COMPANY_ADMIN'
) {

    ownerId =
        req.headers[
            'x-company-id'
        ];

    ownerType =
        'COMPANY';

    companyAdminId =
    req.headers[
        'x-user-id'
    ];
}

else if (
    role ===
    'RECRUITER'
) {

    ownerId =
        req.headers[
            'x-user-id'
        ];

    ownerType =
        ownerTypes.CANDIDATE;
}

        const subscription =
            await subscriptionService
            .cancelSubscription(id,ownerId,ownerType,companyAdminId);

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch(error) {

        next(error);
    }
};

// const getFeatures =
// async (
//     req,
//     res,
//     next
// ) => {

//     try {

//         const role =
//             req.headers[
//                 'x-user-role'
//             ];

//         if (
//     role === 'CANDIDATE'
// ) {

//     ownerId =
//         req.headers[
//             'x-user-id'
//         ];

//     ownerType =
//         'CANDIDATE';
// }

// else {

//     ownerId =
//         req.headers[
//             'x-company-id'
//         ];

//     ownerType =
//         'COMPANY';
// }

//         const premiumAnalytics =
//             await featureAccessService
//             .canUsePremiumAnalytics(
//                 ownerId,ownerType
//             );

//         const priorityApplications =
//             await featureAccessService
//             .canUsePriorityApplications(
//                 ownerId,ownerType
//             );

//         const maxJobs =
//             await featureAccessService
//             .getMaxJobsAllowed(
//                 ownerId,ownerType
//             );

//         res.status(200).json({

//             success: true,

//             data: {

//                 premiumAnalytics,

//                 priorityApplications,

//                 maxJobs
//             }
//         });

//     } catch(error) {

//         next(error);
//     }
// };

const getCompanyFeatures =
async (
    req,
    res,
    next
) => {

    try {

        const role =
            req.headers[
                'x-user-role'
            ];

        if (
            role ===
            'CANDIDATE'
        ) {

            throw new AppError(
                'Candidates do not have company features',
                403
            );
        }

        const companyId =
            req.headers[
                'x-company-id'
            ];

        const premiumAnalytics =
            await featureAccessService
                .canUsePremiumAnalytics(
                    companyId,
                    ownerTypes.COMPANY
                );

        const maxJobs =
            await featureAccessService
                .getMaxJobsAllowed(
                    companyId,
                    ownerTypes.COMPANY
                );

        res.status(200).json({

            success: true,

            data: {

                premiumAnalytics,

                maxJobs
            }
        });

    } catch (error) {

        next(error);
    }
};

const getPersonalFeatures =
async (
    req,
    res,
    next
) => {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const priorityApplications =
            await featureAccessService
                .canUsePriorityApplications(
                    userId,
                    ownerTypes.CANDIDATE
                );

        res.status(200).json({

            success: true,

            data: {

                priorityApplications
            }
        });

    } catch (error) {

        next(error);
    }
};

const getSubscription =
asyncHandler(
    async (
        req,
        res
    ) => {



        const role =
            req.headers[
                'x-user-role'
            ];

        if (
    role === 'COMPANY_ADMIN'
) {

    ownerId =
        req.headers[
            'x-company-id'
        ];

    ownerType =
        ownerTypes.COMPANY;
}

else {

    ownerId =
        req.headers[
            'x-user-id'
        ];

    ownerType =
        ownerTypes.CANDIDATE;
}

        const subscription =
            await subscriptionService
                .getSubscription(
                    ownerId,ownerType
                );

        res.status(200)
            .json({

                success: true,

                data:
                    subscription
            });
    }
);

module.exports = {
    getPlans,
    purchaseSubscription,
    cancelSubscription,
    // getFeatures,
    getCompanyFeatures,
    getPersonalFeatures,
    getSubscription
};