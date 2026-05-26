const authService =
    require('../services/authService');

const asyncHandler =
    require('../utils/asyncHandler');

const sessionService =
    require('../services/sessionService');

const {
    setRefreshCookie
} = require('../utils/cookies');

const signupCandidate =
    asyncHandler(

    async (req, res) => {

        const user =
            await authService.signup({

                ...req.body,

                role: 'CANDIDATE'
            });

        res.status(201).json({
            message:
                'Candidate created',
            user
        });
    }
);



const signupCompany =
    asyncHandler(

    async (req, res) => {
        console.log(
            'Controller started'
        );

        console.log(
            'Request body:',
            req.body
        );

        console.log(
            'Before service call'
        );
        const user =
            await authService.signup({

                ...req.body,

                role:
                    'COMPANY_ADMIN'
            });
            console.log(
            'After service call'
        );

        console.log(
            'Sending response'
        );
        res.status(201).json({
            message:
                'Company admin created',
            user
        });
    }
);

const login = asyncHandler(

    async (req, res) => {

        const user =
            await authService.login(
                req.body
            );

        const {
            accessToken,
            refreshToken
        } =
            await sessionService
                .createSession(user);

        setRefreshCookie(
            res,
            refreshToken
        );

        res.json({
            accessToken
        });
    }
);

const refreshAccessToken =
    asyncHandler(

    async (req, res) => {

        const refreshToken =req.cookies.refreshToken;

        const {

            accessToken,

            refreshToken:
                newRefreshToken

        } = await authService
                .refreshAccessToken(
                    refreshToken
                );

        setRefreshCookie(
            res,
            refreshToken
        );

        res.json({
            accessToken
        });
    }
);

const logout =
    asyncHandler(

    async (req, res) => {

        const refreshToken =
            req.cookies.refreshToken;

        await authService.logout(
            refreshToken
        );

        res.clearCookie(
            'refreshToken'
        );

        res.json({
            message:
                'Logged out successfully'
        });
    }
);

const getMe = asyncHandler(

    async (req, res) => {

        res.json({
            user: req.user
        });
    }
);

const googleCallback =
    asyncHandler(

    async (req, res) => {

        const user = req.user;

        const {
            accessToken,
            refreshToken
        } =
            await sessionService
                .createSession(user);

setRefreshCookie(
    res,
    refreshToken
);

        res.json({
            accessToken
        });
    }
);

module.exports = {
    signupCandidate,
    signupCompany,
    login,
    refreshAccessToken,
    getMe,
    logout,
    googleCallback
};