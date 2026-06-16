const {
    body
} = require(
    'express-validator'
);

const updateApplicationStatusValidator = [

    body('status')

        .notEmpty()

        .withMessage(
            'Status is required'
        )

        .isIn([

            'PENDING',

            'REVIEWED',

            'REJECTED',

            'ACCEPTED'

        ])

        .withMessage(
            'Invalid status'
        )

];

const applyJobValidator =[
    body('resumeUrl')
    .notEmpty()
    .withMessage('Resume URL is required')
];

module.exports = {

    updateApplicationStatusValidator,
    applyJobValidator

};