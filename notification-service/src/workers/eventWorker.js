const { Worker } =
    require('bullmq');

// const redis =
    // require('../config/redis');
const Redis =
    require('ioredis');
const notificationService =
    require(
        '../services/notificationService'
    );

const connection =
    new Redis({

        host:
            process.env.REDIS_HOST,

        port:
            process.env.REDIS_PORT,

        maxRetriesPerRequest:null

    });

const eventWorker =
    new Worker(

        'notificationQueue',

        async (job) => {

            console.log(
                'Received Event:',
                job.name
            );

            const recipientId =

    job.data.ownerType ===
    'COMPANY'

        ?  (
            job.data.companyAdminId
            || job.data.ownerId
        )


        : job.data.ownerId;

             switch(job.name) {

    case 'SUBSCRIPTION_CREATED':

    await notificationService
        .createNotification({

            userId:
                recipientId,

            type:
                'SUBSCRIPTION_CREATED',

            title:
                'Subscription Activated',

            message:
                'Your subscription is now active'
        });

    break;

    case 'PAYMENT_SUCCESS':

    await notificationService
        .createNotification({

            userId:
                recipientId,

            type:
                'PAYMENT_SUCCESS',

            title:
                'Payment Successful',

            message:
                `Payment of ₹${job.data.amount} processed successfully.`
        });

    break;

    case 'PAYMENT_FAILED':

    await notificationService
        .createNotification({

            userId:
                recipientId,

            type:
                'PAYMENT_FAILED',

            title:
                'Payment Failed',

            message:
                `Payment of ₹${job.data.amount} failed.`
        });

    break;

    case 'SUBSCRIPTION_CANCELLED':

    await notificationService
        .createNotification({

            userId:
                recipientId,

            type:
                'SUBSCRIPTION_CANCELLED',

            title:
                'Subscription Cancelled',

            message:
                'Your subscription has been cancelled.'
        });

    break;

    case 'SUBSCRIPTION_EXPIRED':

    await notificationService
        .createNotification({

            userId:
                recipientId,

            type:
                'SUBSCRIPTION_EXPIRED',

            title:
                'Subscription Expired',

            message:
                'Your subscription has expired.'
        });

    break;

    case 'APPLICATION_SUBMITTED':

    await notificationService
        .createNotification({

            userId:
                job.data.candidateId,

            type:
                'APPLICATION_SUBMITTED',

            title:
                'Application Submitted',

            message:
    `Your application for "${job.data.jobTitle}" at ${job.data.companyName} has been submitted successfully.`
        });

        await notificationService
    .createNotification({

        userId:
            job.data.recruiterId,

        type:
            'NEW_APPLICATION',

        title:
            'New Application Received',

        message:
            `A candidate applied your job "${job.data.jobTitle}".`
    });

    break;

    case 'APPLICATION_REVIEWED':

    await notificationService
        .createNotification({

            userId:
                job.data.candidateId,

            type:
                'APPLICATION_REVIEWED',

            title:
                'Application Reviewed',

            message:
    `Your application for "${job.data.jobTitle}" at ${job.data.companyName} has been been reviewed.`
        });

    break;

    case 'APPLICATION_ACCEPTED':

    await notificationService
        .createNotification({

            userId:
                job.data.candidateId,

            type:
                'APPLICATION_ACCEPTED',

            title:
                'Application Accepted',

            message:
    `Congratulations! Your application for "${job.data.jobTitle}" at ${job.data.companyName} has been accepted.`
        });

    break;

    case 'APPLICATION_REJECTED':

    await notificationService
        .createNotification({

            userId:
                job.data.candidateId,

            type:
                'APPLICATION_REJECTED',

            title:
                'Application Rejected',

           message:
    `Your application for "${job.data.jobTitle}" at ${job.data.companyName} was not selected.`
        });

    break;

    case "JOB_CREATED":

    await notificationService
        .createNotification({

            userId:
                job.data.recruiterId,

            type:
                "JOB_CREATED",

            title:
                "Job Created",

            message:
                `"${job.data.title}" has been posted successfully.`

        });

    break;

case "JOB_UPDATED":

    await notificationService
        .createNotification({

            userId:
                job.data.recruiterId,

            type:
                "JOB_UPDATED",

            title:
                "Job Updated",

            message:
                `"${job.data.title}" has been updated successfully.`

        });

    break;

case "JOB_DELETED":

    await notificationService
        .createNotification({

            userId:
                job.data.recruiterId,

            type:
                "JOB_DELETED",

            title:
                "Job Deleted",

            message:
                `"${job.data.title}" has been deleted.`

        });

    break;


    default:
        console.log(
            'Unknown event'
        );
}
        },

        {
            connection:
                connection,

            concurrency:5
        }
    );

   eventWorker.on(
    'completed',
    job => {

        console.log(
            `${job.name} processed successfully`
        );
    }
);

eventWorker.on(
    'failed',
    (
        job,
        error
    ) => {

        console.error(
            `${job?.name} failed`,
            error
        );
    }
);