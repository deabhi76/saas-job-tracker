const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const authProxy = require('./routes/authProxy');
const verifyJWT = require('./middleware/verifyJWT');
const errorMiddleware = require('./middleware/errorMiddleware');

const rateLimiter = require('./middleware/rateLimiter');

const authorizeRoles =
    require('./middleware/authorizeRoles');

const jobProxy =
    require('./routes/jobProxy');

const gatewayJobRoutes =
    require(
        './routes/jobRoutes'
    );

const notificationProxy =
    require(
        './routes/notificationProxy'
    );

const billingProxy =
    require(
        './routes/billingProxy'
    );

const analyticsProxy =
    require(
        './routes/analyticsProxy'
    );


const app = express();

app.use(helmet());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());


app.use(morgan('dev'));


app.use(rateLimiter);

app.use(

    '/api/auth/me',

    verifyJWT,

    authProxy
);

app.use('/api/auth', authProxy);

app.use(
    '/api/jobs',
    gatewayJobRoutes
);


app.get('/health', (req, res) => {

    return res.status(200).json({

        success: true,
        message: 'API Gateway healthy'

    });

});

app.use(

    '/api/notifications',

    verifyJWT,

    authorizeRoles(

        'CANDIDATE',

        'RECRUITER',

        'COMPANY_ADMIN'

    ),

    notificationProxy

);

app.use(

    '/api/billing',

    (req, res, next) => {

        console.log(
            'BILLING ROUTE HIT'
        );

        next();
    },

    verifyJWT,

    billingProxy
);

// app.use(

//     '/api/billing',

//     verifyJWT,

//     billingProxy
// );

app.use(

    '/api/analytics',

    verifyJWT,

    authorizeRoles(
        'SUPER_ADMIN',

    'COMPANY_ADMIN',

    'RECRUITER',

    'CANDIDATE'
    ),

    analyticsProxy
);



app.use(errorMiddleware);

module.exports = app;