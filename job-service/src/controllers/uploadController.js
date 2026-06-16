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

        return res.json({

            success: true,

            resumeUrl:

                `uploads/resumes/${req.file.filename}`
        });

    } catch (err) {

        next(err);
    }
}

module.exports = {

    uploadResume
};