function authorizePermissions(
    ...requiredPermissions
) {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const userPermissions =
            req.user.permissions || [];

        const allowed =
            requiredPermissions.every(
                permission =>
                    userPermissions.includes(
                        permission
                    )
            );

        if (!allowed) {

            return res.status(403).json({
                error: 'Insufficient permissions'
            });
        }

        next();
    };
}

module.exports =
    authorizePermissions;