const express = require('express');

const billingRoutes =
    require('./routes/billingRoutes');
const internalRoutes =
    require(
        './routes/internalRoutes'
    );
const errorMiddleware =
    require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());

app.use(
    '/billing',
    billingRoutes
);

app.use(
    '/internal',
    internalRoutes
);

app.use(
    errorMiddleware
);

module.exports = app;