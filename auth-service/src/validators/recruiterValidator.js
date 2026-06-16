const {
    body
} = require(
    'express-validator'
);

const recruiterValidator = [

    body('email')
        .isEmail()
        .withMessage(
            'Valid email required'
        ),

    body('password')
        .isLength({
            min: 8
        })
        .withMessage(
            'Password must be at least 8 characters'
        )
];

module.exports = {
    recruiterValidator
};