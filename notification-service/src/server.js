require('dotenv').config();

const app =
    require('./app');

const pool =
    require('./config/db');

const redis =
    require('./config/redis');

require(
    './workers/billingEventWorker'
);



const PORT =
    process.env.PORT || 3003;

async function startServer() {

    try {

        await pool.query(
            'SELECT NOW()'
        );

        console.log(
            'PostgreSQL Connected'
        );

        await redis.ping();

        console.log(
            'Redis Connected'
        );

        app.listen(
            PORT,
            () => {

                console.log(

                    `Notification Service running on port ${PORT}`

                );

            }
        );

    } catch (err) {

        console.error(
            'Startup Error:',
            err
        );

        process.exit(1);

    }

}

startServer();