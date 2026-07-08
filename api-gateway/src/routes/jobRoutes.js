const express =
    require('express');

const router =
    express.Router();

const verifyJWT =
    require('../middleware/verifyJWT');

const authorizeRoles =
    require('../middleware/authorizeRoles');

const jobProxy =
    require('./jobProxy');


// ---------------- PUBLIC ----------------

router.get(
    '/',
    jobProxy
);



// ---------------- CANDIDATE ----------------

router.post(

    '/:id/apply',

    verifyJWT,

    authorizeRoles(
        'CANDIDATE',
        'RECRUITER'
    ),

    jobProxy
);

router.get(

    '/job/:id/applied',

    verifyJWT,

    authorizeRoles(
        'CANDIDATE',
        'RECRUITER'
    ),

    jobProxy

);

router.get(

    '/applications/my-applications',

    verifyJWT,

    authorizeRoles(
        'CANDIDATE',
        'RECRUITER'
    ),

    jobProxy
);

router.get(

    '/applications/:id',

    verifyJWT,

    authorizeRoles(
        'CANDIDATE',
        'RECRUITER'
    ),

    jobProxy
);


// ---------------- RECRUITER ----------------

router.get(

    '/my-jobs',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN',
        'RECRUITER'
    ),

    jobProxy
);

router.post(

    '/',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN',
        'RECRUITER'
    ),

    jobProxy
);

router.put(

    '/:id',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN',
        'RECRUITER'
    ),

    jobProxy
);

router.delete(

    '/:id',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN',
        'RECRUITER'
    ),

    jobProxy
);

router.get(

    '/:id/applications',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN',
        'RECRUITER'
    ),

    jobProxy
);

router.patch(

    '/applications/:id/status',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN',
        'RECRUITER'
    ),

    jobProxy
);


router.get(
    '/:id',
    jobProxy
);

router.post(

    '/upload-resume',

    verifyJWT,

    authorizeRoles(
        'CANDIDATE',
        'RECRUITER'
    ),

    jobProxy
);


module.exports = router;