const {

    body,
    param

} = require(
    'express-validator'
);

const createJobValidator = [

    body('title')

        .trim()

        .notEmpty()

        .withMessage(
            'Title is required'
        )

        .isLength({
            min: 3,
            max: 100
        })

        .withMessage(
            'Title must be between 3 and 100 characters'
        ),

    body('description')

        .trim()

        .notEmpty()

        .withMessage(
            'Description is required'
        )

        .isLength({
            min: 10
        })

        .withMessage(
            'Description must be at least 10 characters'
        ),

    body('location')

        .trim()

        .notEmpty()

        .withMessage(
            'Location is required'
        ),

    body('salaryMin')

        .isInt({
            min: 0
        })

        .withMessage(
            'Minimum salary must be positive'
        ),

    body('salaryMax')

        .isInt({
            min: 0
        })

        .withMessage(
            'Maximum salary must be positive'
        ),

    body('employmentType')

        .isIn([

            'FULL_TIME',

            'PART_TIME',

            'INTERNSHIP',

            'CONTRACT'

        ])

        .withMessage(
            'Invalid employment type'
        )

];

const jobIdValidator = [

    param('id')

        .isUUID()

        .withMessage(
            'Invalid job ID'
        )

];

module.exports = {

    createJobValidator,

    jobIdValidator

};