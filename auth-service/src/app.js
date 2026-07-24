require('dotenv').config();

const express = require('express');

const authRoutes =require('./routes/authRoutes');

const pool =require('./db/db');

const cors = require('cors');
console.log("REDIS_URL =", process.env.REDIS_URL);
console.log("NODE_ENV =", process.env.NODE_ENV);
const {
    connectRedis
} = require('./config/redis');


const app = express();

app.use(cors({

    origin: true,

    credentials: true

}));

app.use(express.json());

const passport=require('passport');

require('./oauth/googleStrategy');

app.use(passport.initialize());

const cookieParser =
    require('cookie-parser');

app.use(cookieParser());


app.use((req, res, next) => {

    console.log(
        'Auth Service received:',
        req.method,
        req.url
    );

    next();

});



app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Auth Service Running');
});

const PORT = process.env.PORT;






async function startServer() {

    try {

        await connectRedis();

        await pool.query(
            'SELECT NOW()'
        );

        console.log(
            'Database connection successful'
        );

        app.listen(PORT, () => {

            console.log(
                `Auth Service running on port ${PORT}`
            );
        });

    } catch (err) {

        console.error(
            'Startup error:',
            err
        );

        process.exit(1);
    }
}

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);


startServer();


