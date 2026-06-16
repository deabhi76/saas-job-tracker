const express =
    require('express');

const router =
    express.Router();

const {

    createJob,

    getMyJobs,
    updateJob,
    deleteJob,
    getAllJobs,
    getJobById

} = require('../controllers/jobController');
// 6dbd4bb8-30e2-4d17-95c0-549fa9bf8538
// 175d8902-9b94-45dd-9314-718fffe5aa90
const {

    applyToJob,
    getMyApplications,
    getApplicationsForJob,
    updateApplicationStatus,
    getApplicationForCandidate

} = require(
    '../controllers/applicationController'
);

const {

    createJobValidator,
    jobIdValidator

} = require(
    '../validators/jobValidator'
);

const {

    updateApplicationStatusValidator,
    applyJobValidator

} = require(
    '../validators/applicationValidator'
);



const validate =
    require(
        '../middleware/validationMiddleware'
    );

const upload =
    require(
        '../config/multer'
    );

const {
    uploadResume
} = require(
    '../controllers/uploadController'
);

router.post(

    '/:id/apply',
    
    applyJobValidator,

    jobIdValidator,

    validate,

    applyToJob

);



router.post(
    '/',
    createJobValidator,
    validate,
    createJob
);

router.get(

    '/my-jobs',

    getMyJobs

);

router.get(

    '/applications/my-applications',

    getMyApplications

);

router.patch(

    '/applications/:id/status',

    updateApplicationStatusValidator,

    validate,

    updateApplicationStatus

);

router.get(

    '/:id/applications',

     jobIdValidator,

    validate,

    getApplicationsForJob

);

router.get(

    '/applications/:id',

    getApplicationForCandidate

);

router.get(
    '/:id',
     jobIdValidator,

    validate,

    getJobById
);

router.put(

    '/:id',
     jobIdValidator,

    validate,

    createJobValidator,
    validate,

    updateJob

);

router.delete(

    '/:id',

     jobIdValidator,

    validate,

    deleteJob

);

router.get(
    '/',
    getAllJobs
);

router.post(

    '/upload-resume',

    verifyJWT,

    authorizeRoles(
        'CANDIDATE'
    ),

    upload.single(
        'resume'
    ),

    uploadResume
);

module.exports =
    router;