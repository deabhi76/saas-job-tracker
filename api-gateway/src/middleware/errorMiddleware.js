function errorMiddleware(
    err,
    req,
    res,
    next
) {

    console.error(err);

    const statusCode =
        err.statusCode || 500;

    return res.status(statusCode).json({

        success: false,

        status:
            err.status || 'error',

        message:
            err.message ||
            'Internal Server Error'

    });

}

module.exports =
    errorMiddleware;