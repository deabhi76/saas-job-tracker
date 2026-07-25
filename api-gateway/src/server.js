require('dotenv').config();

// const app = require('./app');

const {
    connectRedis,
    redisClient
} = require('./config/redis');

const PORT = process.env.PORT || 5000;

let server;

async function startServer() {

    try {

        await connectRedis();

        const app = require('./app');

        server=app.listen(PORT, () => {

            console.log(
                `API Gateway running on port ${PORT}`
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


async function gracefulShutdown() {

    console.log(
        'Gracefully shutting down gateway...'
    );

    try {

        if (server) {

            server.close(() => {

                console.log(
                    'HTTP server closed'
                );

            });

        }

        if (redisClient) {

            await redisClient.quit();

            console.log(
                'Redis disconnected'
            );

        }

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


