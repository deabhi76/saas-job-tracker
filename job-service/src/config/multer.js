const multer =
    require('multer');

const path =
    require('path');

const storage =
    multer.diskStorage({

        destination:
            (
                req,
                file,
                cb
            ) => {

                cb(
                    null,
                    'src/uploads/resumes'
                );
            },

        filename:
            (
                req,
                file,
                cb
            ) => {

                const fileName =

                    Date.now()

                    + '-'

                    + Math.round(
                        Math.random() * 1e9
                    )

                    + path.extname(
                        file.originalname
                    );

                cb(
                    null,
                    fileName
                );
            }
    });

const fileFilter =
    (
        req,
        file,
        cb
    ) => {

        if (

            file.mimetype ===
            'application/pdf'

        ) {

            return cb(
                null,
                true
            );
        }

        cb(
            new Error(
                'Only PDF files allowed'
            )
        );
    };

module.exports =
    multer({

        storage,

        fileFilter,

        limits: {

            fileSize:
                5 * 1024 * 1024
        }
    });