const applicationService =
    require(
        '../services/applicationService'
    );

async function applyToJob(
    req,
    res,
    next
) {

    try {

        const candidateId =
            req.headers[
                'x-user-id'
            ];

        const application =
            await applicationService
                .applyToJob({

                    jobId:
                        req.params.id,

                    candidateId,

                    resumeUrl:req.body.resumeUrl

                });

        return res.status(201)
            .json({

                success: true,

                data: application

            });

    } catch (err) {

        next(err);

    }

}

async function getMyApplications(
    req,
    res,
    next
) {

    try {

        const candidateId =
            req.headers[
                'x-user-id'
            ];

        const applications =
            await applicationService
                .getMyApplications(
                    candidateId
                );

        return res.json({

            success: true,

            count:
                applications.length,

            data:
                applications

        });

    } catch (err) {

        next(err);

    }

}

async function getApplicationsForJob(
    req,
    res,
    next
) {

    try {

        const userId =
    req.headers[
        'x-user-id'
    ];

const role =
    req.headers[
        'x-user-role'
    ];

const companyId =
    req.headers[
        'x-company-id'
    ];

const applications =
    await applicationService
        .getApplicationsForJob(

            req.params.id,

            userId,

            role,

            companyId

        );

        return res.json({

            success: true,

            count:
                applications.length,

            data:
                applications

        });

    } catch (err) {

        next(err);

    }

}

async function updateApplicationStatus(
    req,
    res,
    next
) {

    try {

        const userId =
    req.headers[
        'x-user-id'
    ];

const role =
    req.headers[
        'x-user-role'
    ];

const companyId =
    req.headers[
        'x-company-id'
    ];

const updatedApplication =
    await applicationService
        .updateApplicationStatus({

            applicationId:
                req.params.id,

            userId,

            role,

            companyId,

            status:
                req.body.status

        });

        return res.json({

            success: true,

            data:
                updatedApplication

        });

    } catch (err) {

        next(err);

    }

}

async function getApplicationForCandidate(
    req,
    res,
    next
) {

    try {

        const candidateId =
            req.headers[
                'x-user-id'
            ];

        const application =
            await applicationService
                .getApplicationForCandidate(

                    req.params.id,

                    candidateId

                );

        return res.json({

            success: true,

            data: application

        });

    } catch (err) {

        next(err);

    }

}

module.exports = {

    applyToJob,
    getMyApplications,
    getApplicationsForJob,
    updateApplicationStatus,
    getApplicationForCandidate

};