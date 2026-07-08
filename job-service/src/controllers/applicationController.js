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


        const role =
            req.headers[
                'x-user-role'
            ];

//         if (
//     role === "RECRUITER"
// ) {
//     const companyId=req.headers[
//                 'x-user-companyId'
//             ];
    
//     if(Number(companyId) === Number(req.params.company_id))
//     throw new AppError(
//         "Recruiters cannot apply to jobs posted by their own company.",
//         403
//     );
// }
        
        const candidateId =
            req.headers[
                'x-user-id'
            ];

        

       const candidateName=
    req.headers["x-user-name"];

const candidateEmail=
    req.headers["x-user-email"];

        const application =
            await applicationService
                .applyToJob({

                    jobId:
                        req.params.id,

                    candidateId,

                    candidateName,

                    candidateEmail,

                    resumeUrl:req.body.resumeUrl,

                    role,

                    companyId:req.headers["x-company-id"]



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

async function getApplication(
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

        const application =
            await applicationService
                .getApplication(

                    req.params.id,

                    userId,

                    role,

                    companyId

                );

        return res.json({

            success: true,

            data: application

        });

    } catch (err) {

        next(err);

    }

}

async function hasApplied(

    req,

    res,

    next

) {

    try {

        const candidateId =
            req.headers[
                "x-user-id"
            ];

        const applied =
            await applicationService
                .hasApplied(

                    candidateId,

                    req.params.id

                );

        res.json({

            success: true,

            data: {

                applied

            }

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
    getApplication,
    hasApplied

};