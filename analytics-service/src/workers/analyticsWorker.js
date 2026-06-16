const { Worker } =
    require('bullmq');

const Redis =
    require('ioredis');

const analyticsRepository =
    require(
        '../repositories/analyticsRepository'
    );

const recruiterMetricsRepository =
    require(
        '../repositories/recruiterMetricsRepository'
    );

const companyMetricsRepository =
    require(
        '../repositories/companyMetricsRepository'
    );

const candidateMetricsRepository =
    require(
        '../repositories/candidateMetricsRepository'
    );

const redis =
    require(
        '../config/redis'
    );

const connection =
    new Redis({

        host:
            process.env.REDIS_HOST,

        port:
            process.env.REDIS_PORT,

        maxRetriesPerRequest:
            null
    });

const analyticsWorker =
    new Worker(

        'analyticsQueue',

        async (job) => {

            console.log(
                'Analytics Event:',
                job.name
            );

            switch (job.name) {
case 'JOB_CREATED':

    await analyticsRepository
        .incrementMetric(
            'jobs_created'
        );

    await recruiterMetricsRepository
    .incrementMetric(

        job.data.recruiterId,

        'jobs_created'
    );

    await companyMetricsRepository
    .incrementMetric(

        job.data.companyId,

        'jobs_created'
    );

    break;

case 'JOB_UPDATED':

    await analyticsRepository
        .incrementMetric(
            'jobs_updated'
        );

    break;

case 'JOB_DELETED':

    await analyticsRepository
        .incrementMetric(
            'jobs_deleted'
        );

    break;

case 'APPLICATION_SUBMITTED':

    await analyticsRepository
        .incrementMetric(
            'applications_submitted'
        );

    await recruiterMetricsRepository
    .incrementMetric(

        job.data.recruiterId,

        'applications_received'
    );

    await companyMetricsRepository
    .incrementMetric(

        job.data.companyId,

        'applications_received'
    );

await candidateMetricsRepository
    .incrementMetric(

        job.data.candidateId,

        'applications_submitted'
    );

    break;

case 'APPLICATION_REVIEWED':

    await analyticsRepository
        .incrementMetric(
            'applications_reviewed'
        );
    await recruiterMetricsRepository
    .incrementMetric(

        job.data.recruiterId,

        'applications_reviewed'
    );

await companyMetricsRepository
    .incrementMetric(

        job.data.companyId,

        'applications_reviewed'
    );

await candidateMetricsRepository
    .incrementMetric(

        job.data.candidateId,

        'applications_reviewed'
    );

    break;

case 'APPLICATION_ACCEPTED':

    await analyticsRepository
        .incrementMetric(
            'applications_accepted'
        );

    await recruiterMetricsRepository
    .incrementMetric(

        job.data.recruiterId,

        'applications_accepted'
    );

    await companyMetricsRepository
    .incrementMetric(

        job.data.companyId,

        'applications_accepted'
    );

await candidateMetricsRepository
    .incrementMetric(

        job.data.candidateId,

        'applications_accepted'
    );

    break;
case 'APPLICATION_REJECTED':

    await analyticsRepository
        .incrementMetric(
            'applications_rejected'
        );

    await recruiterMetricsRepository
    .incrementMetric(

        job.data.recruiterId,

        'applications_rejected'
    );

    await companyMetricsRepository
    .incrementMetric(

        job.data.companyId,

        'applications_rejected'
    );

await candidateMetricsRepository
    .incrementMetric(

        job.data.candidateId,

        'applications_rejected'
    );
    break;

case 'SUBSCRIPTION_CREATED':

    await analyticsRepository
        .incrementMetric(
            'subscriptions_created'
        );

    break;

case 'SUBSCRIPTION_CANCELLED':

    await analyticsRepository
        .incrementMetric(
            'subscriptions_cancelled'
        );

    break;

case 'SUBSCRIPTION_EXPIRED':

    await analyticsRepository
        .incrementMetric(
            'subscriptions_expired'
        );

    break;

case 'PAYMENT_SUCCESS':


        await analyticsRepository
        .incrementMetric(
            'payments_successful'
        );

    await analyticsRepository
        .incrementMetric(

            'revenue',

            Number(
                job.data.amount
            )
        );

    break;

case 'PAYMENT_FAILED':

    await analyticsRepository
        .incrementMetric(
            'payments_failed'
        );

    break;

            }


          await connection.del(
            'analytics:overview'
        );  

        if (
    job.data?.recruiterId
) {

    await connection.del(

        `analytics:recruiter:${job.data.recruiterId}`
    );

}

if (
    job.data?.companyId
) {

    await connection.del(

        `analytics:company:${job.data.companyId}`
    );
}

if (
    job.data?.candidateId
) {

    await connection.del(

        `analytics:candidate:${job.data.candidateId}`
    );
}

        },

        {
            connection,

            concurrency:5
        }
    );

analyticsWorker.on(

    'completed',

    job => {

        console.log(

            `${job.name} processed`

        );
    }
);