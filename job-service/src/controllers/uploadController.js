const AppError =
    require(
        '../errors/AppError'
    );

async function uploadResume(
    req,
    res,
    next
) {

    try {

        if (!req.file) {

            throw new AppError(

                'Resume required',

                400
            );
        }
        console.log(req.file);

        return res.json({

            success: true,

            resumeUrl:
                    req.file.path
        });

    } catch (err) {

        next(err);
    }
}

module.exports = {

    uploadResume
};