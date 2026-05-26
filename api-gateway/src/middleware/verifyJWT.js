const jwt =
    require('jsonwebtoken');

function verifyJWT(
    req,
    res,
    next
) {

    try {

        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith('Bearer ')
        ) {

            return next(

                new AppError(
                    'Access token missing',
                    401
                )

            );

        }

        const token =
            authHeader.split(' ')[1];

        const decoded =
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET
            );

        req.user = decoded;

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