const express =
    require('express');

const cors =
    require('cors');

const helmet =
    require('helmet');

const morgan =
    require('morgan');

const analyticsRoutes =
    require(
        './routes/analyticsRoutes'
    );

const app =
    express();

app.use(
    helmet()
);

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(
    express.json()
);

app.use(
    morgan('dev')
);

app.get(

    '/health',

    (
        req,
        res
    ) => {

        res.status(200).json({

            success: true,

            message:
                'Analytics Service Healthy'
        });

    }
);

app.use(

    '/analytics',

    analyticsRoutes
);

app.use(

    (
        err,
        req,
        res,
        next
    ) => {

        console.error(
            err
        );

        res.status(

            err.statusCode ||
            500

        ).json({

            success: false,

            message:
                err.message ||
                'Internal Server Error'
        });
    }
);

module.exports =
    app;