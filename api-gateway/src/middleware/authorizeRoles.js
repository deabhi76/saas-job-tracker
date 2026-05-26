const AppError =
    require('../errors/AppError');

function authorizeRoles(
    ...allowedRoles
) {

    return function(
        req,
        res,
        next
    ) {

        if (!req.user) {

            return next(

                new AppError(
                    'Unauthorized',
                    401
                )

            );
        }

        const userRole =
            req.user.role;

        if (
            !allowedRoles.includes(
                userRole
            )
        ) {

            return next(

                new AppError(
                    'Forbidden',
                    403
                )

            );
        }

        next();

    };

}

module.exports =
    authorizeRoles;