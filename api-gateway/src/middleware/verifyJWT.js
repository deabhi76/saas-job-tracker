const jwt =
    require('jsonwebtoken');

const AppError=require('../errors/AppError')

function verifyJWT(
    req,
    res,
    next
) {

    try {

        const authHeader =
            req.headers.authorization;

            console.log(
    "AUTH HEADER:",
    authHeader
);

        if (
            !authHeader ||
            !authHeader.startsWith('Bearer ')
        ) {

            console.log(
        "JWT ERROR:",
        err
    );

            return next(

                new AppError(
                    'Access token missing',
                    401
                )

            );

        }

        const token =
            authHeader.split(' ')[1];

            console.log(
            "TOKEN:",
            token
        );

        const decoded =
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET
            );

        req.user = decoded;

        console.log(req.user);

        next();

    } catch (err) {

        return next(

            new AppError(
                'Invalid or expired token',
                401
            )

        );

    }

}

module.exports =
    verifyJWT;