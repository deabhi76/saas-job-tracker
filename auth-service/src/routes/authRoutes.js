

const express = require('express');

const router = express.Router();

const verifyJWT =
    require('../middleware/authMiddleware');

const authorizeRoles =
    require(
        '../middleware/roleMiddleware'
    );


const {
    signupCandidate,
    signupCompany,
    createRecruiter,
    login,
    refreshAccessToken,
    getMe,
    logout,
    googleCallback,
    getRecruiters
} = require('../controllers/authController');


const {
    companySignupValidator,
    candidateSignupValidator,
    loginValidator
} = require('../validators/authValidator');

const {
    recruiterValidator
} = require('../validators/recruiterValidator');

const validate =
    require('../middleware/validationMiddleware');

const passport = require('passport');

router.post(

    '/signup/candidate',


     candidateSignupValidator,

    

     validate,



    signupCandidate
);



router.post(

    '/signup/company',

    companySignupValidator,

    validate,

    signupCompany
);

router.post(

    '/recruiters',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN'
    ),

    recruiterValidator,

    validate,

    createRecruiter
);

router.post('/login',loginValidator,validate, login);

router.get(
    '/me',

    verifyJWT,

    getMe
);

router.post(
    '/refresh',

    refreshAccessToken
);

router.post(
    '/logout',

    logout
);

router.get(

    '/google/candidate',

    passport.authenticate(

        'google',

        {
            scope: [
                'profile',
                'email'
            ],

            state: 'CANDIDATE'
        }
    )
);

router.get(

    '/google/company',

    passport.authenticate(

        'google',

        {
            scope: [
                'profile',
                'email'
            ],

            state:
                'COMPANY_ADMIN'
        }
    )
);

router.get(

    '/google/callback',

    passport.authenticate(
        'google',
        {
            session: false

        }
    ),
    
    googleCallback
    
);

router.get(

    '/recruiters',

    verifyJWT,

    authorizeRoles(
        'COMPANY_ADMIN'
    ),

    getRecruiters
);

module.exports = router;