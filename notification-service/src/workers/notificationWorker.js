require('dotenv').config();

const { Worker } =
    require('bullmq');

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

const worker =
    new Worker(

        'notifications',

        async (job) => {

            console.log(

                'Processing notification job:',

                job.data

            );

            await notificationService
                .createNotification(

                    job.data

                );

        },

        { connection }

    );

worker.on(

    'completed',

    (job) => {

        console.log(

            `Job ${job.id} completed`

        );

    }

);

worker.on(

    'failed',

    (job, err) => {

        console.error(

            `Job ${job.id} failed:`,

            err

        );

    }

);