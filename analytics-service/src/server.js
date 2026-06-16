require('dotenv')
    .config();

const app =
    require('./app');

const pool =
    require('./config/db');

require(
    './workers/analyticsWorker'
);

const PORT =
    process.env.PORT ||
    3005;

async function startServer() {

    try {

        await pool.query(
            'SELECT 1'
        );

        console.log(
            'PostgreSQL Connected'
        );

        app.listen(

            PORT,

            () => {

                console.log(

                    `Analytics Service running on port ${PORT}`

                );
            }
        );

    } catch (error) {

        console.error(

            'Failed to start server',

            error
        );

        process.exit(1);
    }
}

startServer();