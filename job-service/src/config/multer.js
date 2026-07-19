const multer =
    require("multer");

const {
    CloudinaryStorage
} = require(
    "multer-storage-cloudinary"
);

const cloudinary =
    require(
        "../config/cloudinary"
    );

const storage =
    new CloudinaryStorage({

        cloudinary,

        params: async (
            req,
            file
        ) => ({

            folder:
                "saas-job-tracker/resumes",

            resource_type:
                "auto",

            // format:
            //     "pdf",

            public_id:
                `${Date.now()}-${Math.round(
                    Math.random() * 1e9
                )}`

        })

    });

const fileFilter =
    (
        req,
        file,
        cb
    ) => {

        if (

            file.mimetype ===
            "application/pdf"

        ) {

            return cb(
                null,
                true
            );

        }

        cb(

            new Error(
                "Only PDF files allowed"
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