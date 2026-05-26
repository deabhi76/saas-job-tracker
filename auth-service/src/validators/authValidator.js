const {
    body
} = require('express-validator');

const candidateSignupValidator = [

    body('email')

        .trim()

        .isEmail()

        .normalizeEmail()

        .withMessage(
            'Invalid email'
        ),

    body('password')

        .isLength({ min: 6 })

        .withMessage(
            'Password must be at least 6 characters'
        )
];

const companySignupValidator = [

    body('companyName')

        .trim()

        .notEmpty()

        .withMessage(
            'Company name is required'
        ),

    body('email')

        .trim()

        .isEmail()

        .normalizeEmail()

        .withMessage(
            'Invalid email'
        ),

    body('password')

        .isLength({ min: 6 })

        .withMessage(
            'Password must be at least 6 characters'
        )
];

const loginValidator = [

    body('email')

        .trim()

        .isEmail()

        .normalizeEmail()

        .withMessage(
            'Invalid email'
        ),

    body('password')

        .notEmpty()

        .withMessage(
            'Password is required'
        )
];

module.exports = {

    candidateSignupValidator,

    companySignupValidator,

    loginValidator
};