const express = require('express');

const billingRoutes =
    require('./routes/billingRoutes');

const errorMiddleware =
    require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());

app.use(
    '/api/billing',
    billingRoutes
);

app.use(
    errorMiddleware
);

module.exports = app;