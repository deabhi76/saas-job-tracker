require('dotenv').config();

const app = require('./app');

const pool = require('./db/pool');

const {
    runExpirationCheck
} = require(
    './workers/subscriptionExpirationWorker'
);

async function startServer() {

    try {

        await pool.query('SELECT NOW()');

        console.log('Billing DB Connected');

        app.listen(process.env.PORT, () => {

            console.log(
                `Billing Service running on port ${process.env.PORT}`
            );

        });

    }
    catch(error) {

        console.error(error);

        process.exit(1);
    }
}


startServer();

setInterval(
    runExpirationCheck,
    60 * 60 * 1000
);