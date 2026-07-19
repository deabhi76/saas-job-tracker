const express =
    require('express');

const helmet =
    require('helmet');

const cors =
    require('cors');

const morgan =
    require('morgan');

const notificationRoutes =
    require(
        './routes/notificationRoutes'
    );

const app = express();

app.use(helmet());

app.use(

    cors({

        origin: true,

        credentials: true

    })

);

app.use(express.json());

app.use(morgan('dev'));


app.use(
    '/notifications',
    notificationRoutes
);

app.get(

    '/health',

    (req, res) => {

        return res.status(200)
            .json({

                success: true,

                message:
                    'Notification Service healthy'

            });

    }
);

module.exports = app;