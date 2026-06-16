function authorizeRoles(
    ...allowedRoles
) {

    return (
        req,
        res,
        next
    ) => {

        const role =
            req.headers[
                'x-user-role'
            ];

        if (!role) {

            return res.status(401)
                .json({

                    success: false,

                    message:
                        'Unauthorized'
                });
        }

        if (

            !allowedRoles.includes(
                role
            )

        ) {

            return res.status(403)
                .json({

                    success: false,

                    message:
                        'Forbidden'
                });
        }

        next();
    };
}

module.exports =
    authorizeRoles;