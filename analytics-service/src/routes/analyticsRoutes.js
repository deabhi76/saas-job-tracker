const express =
    require('express');

const router =
    express.Router();

const analyticsController =
    require(
        '../controllers/analyticsController'
    );
// const checkPremiumAnalytics =
//     require(
//         '../middleware/checkPremiumAnalytics'
//     );
const verifyJWT =
    require(
        '../middleware/verifyJWT'
    );

const authorizeRoles =
    require(
        '../middleware/authorizeRoles'
    );

router.get(

    '/admin',

    verifyJWT,

    authorizeRoles(
        'SUPER_ADMIN'
    ),

    analyticsController
        .getOverview
);

router.get(

    '/company',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN'
    ),

    analyticsController
        .getCompanyAnalytics
);

router.get(

    '/recruiter',

    verifyJWT,

    authorizeRoles(
        'RECRUITER'
    ),

    analyticsController
        .getRecruiterAnalytics
);

router.get(

    '/candidate',

    verifyJWT,

    authorizeRoles(
        'CANDIDATE'
    ),

    analyticsController
        .getCandidateAnalytics
);

module.exports =
    router;