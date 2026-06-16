require('dotenv').config();

const app =
    require('./app');

const pool =
    require('./config/db');

const {
    connectRedis,
    redisClient
} = require('./config/redis');

const PORT =
    process.env.PORT || 3002;

let server;

async function startServer() {

    try {

        await connectRedis();

        console.log(
            'Redis Connected'
        );

        await pool.query(
            'SELECT NOW()'
        );

        console.log(
            'PostgreSQL Connected'
        );

        server =
            app.listen(PORT, () => {

                console.log(

                    `Job Service running on port ${PORT}`

                );

            });

    } catch (err) {

        console.error(
            'Startup Error:',
            err
        );

        process.exit(1);

    }

}

startServer();

/*
|--------------------------------------------------------------------------
| Graceful Shutdown
|--------------------------------------------------------------------------
*/

async function gracefulShutdown() {

    console.log(
        'Gracefully shutting down Job Service...'
    );

    try {

        if (server) {

            server.close(() => {

                console.log(
                    'HTTP server closed'
                );

            });

        }

        await pool.end();

        console.log(
            'PostgreSQL disconnected'
        );

        await redisClient.quit();

        console.log(
            'Redis disconnected'
        );

        process.exit(0);

    } catch (err) {

        console.error(
            'Shutdown Error:',
            err
        );

        process.exit(1);

    }

}

process.on(
    'SIGINT',
    gracefulShutdown
);

process.on(
    'SIGTERM',
    gracefulShutdown
);