const applicationRepository =
    require(
        '../repositories/applicationRepository'
    );

const jobRepository =
    require(
        '../repositories/jobRepository'
    );

const AppError =
    require(
        '../errors/AppError'
    );

// const notificationQueue =
//     require(
//         '../config/notificationQueue'
//     );

const {
    publishEvent
} = require(
    '../events/eventPublisher'
);

const eventTypes =
    require(
        '../events/eventTypes'
    );

const billingClient =
    require(
        '../clients/billingClient'
    );
    

async function applyToJob({

    jobId,

    candidateId,

    candidateName,

    candidateEmail,

    resumeUrl,

    role,

    companyId

}) {


    if (!resumeUrl) {

    throw new AppError(

        'Resume required',

        400
    );
}
    const job =
        await jobRepository
            .getJobById(jobId);

    if (!job) {

        throw new AppError(
            'Job not found',
            404
        );

    }

    if (
    role === "RECRUITER" &&
    Number(companyId) === Number(job.company_id)
) {

    throw new AppError(

        "Recruiters cannot apply to jobs posted by their own company.",

        403

    );

}

    try {

        const personalFeatures =
    await billingClient
        .getPersonalFeatures(
            candidateId
        );

        const priorityScore =
    personalFeatures
        .priorityApplications
            ? 100
            : 0;

        const application =

            await applicationRepository
                .createApplication({

                    jobId,

                    candidateId,

                    candidateName,

                    candidateEmail,

                    resumeUrl,

                    priorityScore

                });

        await publishEvent(

    eventTypes
        .APPLICATION_SUBMITTED,

    {

        applicationId:
            application.id,

        candidateId,

        recruiterId:
            job.created_by,

        companyId:
            job.company_id,

        jobId
    }
);

        return application;

    } catch (err) {

        if (

            err.code === '23505'

        ) {

            throw new AppError(

                'Already applied to this job',

                400

            );

        }

        throw err;

    }

}

async function getMyApplications(
    candidateId
) {

    return await applicationRepository
        .getApplicationsByCandidateId(
            candidateId
        );

}

async function getApplicationsForJob(

    jobId,

    userId,
    role,
    companyId

) {

    const job =
        await jobRepository
            .getJobById(jobId);

    if (!job) {

        throw new AppError(
            'Job not found',
            404
        );

    }

    if (

    role ===
    'COMPANY_ADMIN'

) {

    if (

        job.company_id !=
        companyId

    ) {

        throw new AppError(

            'Unauthorized',

            403
        );
    }

} else {

    if (

        job.created_by !=
        userId

    ) {

        throw new AppError(

            'Unauthorized',

            403
        );
    }
}

    return await applicationRepository
        .getApplicationsForJob(
            jobId
        );

}

async function updateApplicationStatus({

    applicationId,

    userId,

    role,

    companyId,

    status

}) {

    const application =
        await applicationRepository
            .getApplicationById(
                applicationId
            );

    if (!application) {

        throw new AppError(
            'Application not found',
            404
        );

    }

    const job =
        await jobRepository
            .getJobById(
                application.job_id
            );

    if (!job) {

        throw new AppError(
            'Job not found',
            404
        );

    }

    if (

    role ===
    'COMPANY_ADMIN'

) {

    if (

        job.company_id !=
        companyId

    ) {

        throw new AppError(

            'Unauthorized',

            403
        );
    }

} else {

    if (

        job.created_by !=
        userId

    ) {

        throw new AppError(

            'Unauthorized',

            403
        );
    }
}

    const validStatuses = [

        'PENDING',

        'REVIEWED',

        'REJECTED',

        'ACCEPTED'

    ];

    if (

        !validStatuses.includes(
            status
        )

    ) {

        throw new AppError(

            'Invalid status',

            400

        );

    }

    const updatedApplication =

    await applicationRepository
        .updateApplicationStatus(

            applicationId,

            status

        );

if (status === 'ACCEPTED') {

    await publishEvent(

        eventTypes
            .APPLICATION_ACCEPTED,

        {

            applicationId,

            candidateId:
                application.candidate_id,

             recruiterId:
        job.created_by,

            companyId:
        job.company_id,
            jobId:
                application.job_id
        }
    );
}

if (status === 'REJECTED') {

    await publishEvent(

        eventTypes
            .APPLICATION_REJECTED,

        {

            applicationId,

            candidateId:
                application.candidate_id,

            recruiterId:
        job.created_by,

    companyId:
        job.company_id,
            jobId:
                application.job_id
        }
    );
}

if (status === 'REVIEWED') {

    await publishEvent(

        eventTypes
            .APPLICATION_REVIEWED,

        {

            applicationId,

            candidateId:
                application.candidate_id,

             recruiterId:
        job.created_by,

    companyId:
        job.company_id,

            jobId:
                application.job_id
        }
    );
}

return updatedApplication;
}

async function getApplication(

    applicationId,

    userId,

    role,

    companyId

) {

    const application =
        await applicationRepository
            .getApplicationById(
                applicationId
            );
            
            
    if (!application) {

        throw new AppError(
            'Application not found',
            404
        );

    }

    const job =
    await jobRepository
        .getJobById(
            application.job_id
        );

    if (
    role === 'CANDIDATE'
) {

    if (
        application.candidate_id !=
        userId
    ) {

        throw new AppError(
            'Unauthorized',
            403
        );
    }
}

else if (
    role === 'RECRUITER'
) {

    if (
        job.created_by !=
        userId
    ) {

        throw new AppError(
            'Unauthorized',
            403
        );
    }
}

else if (
    role === 'COMPANY_ADMIN'
) {

    if (
        job.company_id !=
        companyId
    ) {

        throw new AppError(
            'Unauthorized',
            403
        );
    }
}

    return application;

}

async function hasApplied(

    candidateId,

    jobId

) {

    return await applicationRepository
        .hasApplied(
            candidateId,
            jobId
        );

}

module.exports = {

    applyToJob,

    getMyApplications,
    getApplicationsForJob,
    updateApplicationStatus,
    getApplication,
    hasApplied

};