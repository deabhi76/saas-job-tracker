const express =
    require('express');

const cors =
    require('cors');
const path =require('path')

const helmet =
    require('helmet');

const morgan =
    require('morgan');

const cookieParser =
    require('cookie-parser');

const jobRoutes =
    require('./routes/jobRoutes');

const app =
    express();

app.use(helmet());

app.use(cors({

    origin: true,

    credentials: true

}));

app.use(express.json());

app.use(cookieParser());

app.use(morgan('dev'));


app.use(
    '/jobs',
    jobRoutes
);

app.use(

    '/uploads',

    express.static(

        path.join(
            __dirname,
            '../src/uploads'
        )
    )
);

app.get('/health', (req, res) => {

    return res.status(200).json({

        success: true,

        message:
            'Job Service Healthy'

    });

});

module.exports = app;