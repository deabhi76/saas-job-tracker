const jobRepository =
    require('../repositories/jobRepository');

const AppError =
    require('../errors/AppError');

const billingClient =
    require(
        '../clients/billingClient'
    );

const {
    publishEvent
} = require(
    '../events/eventPublisher'
);

const eventTypes =
    require(
        '../events/eventTypes'
    );
const {
    redisClient
} = require(
    '../config/redis'
);

async function createJob(
    jobData
) {

    const features =
        await billingClient
            .getCompanyFeatures(
                jobData.companyId
            );
        console.log(features);
// if (
//     !features.premiumAnalytics
// ) {

//     throw new AppError(
//         'Premium Analytics required',
//         403
//     );
// }
    const currentJobs =
        await jobRepository
            .countJobsByCompanyId(
                jobData.companyId
            );

    if (

        currentJobs >=
        features.maxJobs

    ) {

        throw new AppError(

            `Job limit reached (${features.maxJobs})`,

            403
        );
    }

    jobData.priorityScore =
    features.priorityListing
        ? 100
        : 0;

    const job =
    await jobRepository
        .createJob(jobData);

await publishEvent(

    eventTypes.JOB_CREATED,

    {

        recruiterId:
            job.created_by,
        
        companyId:job.company_id,

        jobId:
            job.id,

        title:
            job.title,

        companyName: job.company_name
    }
);

await redisClient.del(
    `myjobs:${job.created_by}`
);

await redisClient.del(
    `companyjobs:${job.company_id}`
);

return job;
}

async function getJobsByUserId(
    userId
) {

    const cacheKey =
        `myjobs:${userId}`;

    const cached =
        await redisClient.get(
            cacheKey
        );

    if (cached) {

        return JSON.parse(
            cached
        );
    }

    const jobs =
        await jobRepository
            .getJobsByUserId(
                userId
            );

    await redisClient.set(

        cacheKey,

        JSON.stringify(jobs),

        {
            EX: 60
        }
    );

    return jobs;
}

async function getJobsByCompanyId(
    companyId
) {

    const cacheKey =
        `companyjobs:${companyId}`;

    const cached =
        await redisClient.get(
            cacheKey
        );

    if (cached) {

        return JSON.parse(
            cached
        );
    }

    const jobs =
        await jobRepository
            .getJobsByCompanyId(
                companyId
            );

    await redisClient.set(

        cacheKey,

        JSON.stringify(jobs),

        {
            EX: 60
        }

    );

    return jobs;
}

async function updateJob(

    jobId,

    userId,

    role,

    companyId,

    updateData

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

    const updatedJob =
    await jobRepository
        .updateJob(
            jobId,
            updateData
        );

await publishEvent(

    eventTypes.JOB_UPDATED,

    {

        recruiterId:
            userId,

        jobId,

        companyId:job.company_id,

        jobTitle: job.title,

        companyName: job.company_name
    }
);
await redisClient.del(
    `job:${jobId}`
);

await redisClient.del(
    `myjobs:${job.created_by}`
);

await redisClient.del(
    `companyjobs:${job.company_id}`
);

return updatedJob;

}

async function deleteJob(

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

    const deletedJob =
    await jobRepository
        .deleteJob(jobId);

await publishEvent(

    eventTypes.JOB_DELETED,

    {

        recruiterId:
            userId,

        jobId,
        companyId:job.company_id,

        jobTitle: job.title,

        companyName: job.company_name
    }
);
await redisClient.del(
    `job:${jobId}`
);

await redisClient.del(
    `myjobs:${job.created_by}`
);

await redisClient.del(
    `companyjobs:${job.company_id}`
);

return deletedJob;

}

async function getAllJobs(
    filters
) {

    const cacheKey =
        `jobs:${JSON.stringify(filters)}`;

    const cached =
        await redisClient.get(
            cacheKey
        );

    if (cached) {

        console.log(
            'JOB LIST CACHE HIT'
        );

        return JSON.parse(
            cached
        );
    }

    console.log(
        'JOB LIST CACHE MISS'
    );

    const jobs =
        await jobRepository
            .getAllJobs(
                filters
            );

    await redisClient.set(

        cacheKey,

        JSON.stringify(jobs),

        {
            EX: 60
        }
    );

    return jobs;
}

async function getJobById(
    jobId
) {

    const cacheKey =
        `job:${jobId}`;

    const cached =
        await redisClient.get(
            cacheKey
        );

    if (cached) {

        console.log(
            'CACHE HIT'
        );

        return JSON.parse(
            cached
        );
    }

    console.log(
        'CACHE MISS'
    );

    const job =
        await jobRepository
            .getJobById(
                jobId
            );

    if (!job) {

        throw new AppError(
            'Job not found',
            404
        );
    }

    await redisClient.set(

        cacheKey,

        JSON.stringify(job),

        {
            EX: 300
        }
    );

    return job;
}

async function getMyJobs(
    req,
    res,
    next
) {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const companyId =
            req.headers[
                'x-company-id'
            ];

        const role =
            req.headers[
                'x-user-role'
            ];

        let jobs;

        if (
            role === "COMPANY_ADMIN"
        ) {

            jobs =
                await jobService
                    .getJobsByCompanyId(
                        companyId
                    );

        } else {

            jobs =
                await jobService
                    .getJobsByUserId(
                        userId
                    );

        }

        return res.json({

            success: true,

            count:
                jobs.length,

            data: jobs

        });

    } catch (err) {

        next(err);

    }

}


module.exports = {

    createJob,

    getJobsByUserId,
    getJobsByCompanyId,

    updateJob,

    deleteJob,
    getAllJobs,
    getJobById

};