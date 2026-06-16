const ROLES = {

    SUPER_ADMIN: [

        'MANAGE_ALL'
    ],

    COMPANY_ADMIN: [

        'CREATE_JOB',

        'UPDATE_JOB',

        'DELETE_JOB',

        'VIEW_ANALYTICS',

        'MANAGE_USERS',

        'VIEW_BILLING',

        'MANAGE_RECRUITERS'
    ],

    RECRUITER: [

        'CREATE_JOB',

        'UPDATE_JOB',

        'VIEW_APPLICANTS',

        'UPDATE_CANDIDATE_STATUS',

        'VIEW_ANALYTICS'
    ],

    CANDIDATE: [

        'VIEW_JOBS',

        'APPLY_JOB',

        'SAVE_JOB',

        'VIEW_APPLICATIONS',

        'VIEW_ANALYTICS',

        'UPDATE_PROFILE'
    ]
};

module.exports = ROLES;