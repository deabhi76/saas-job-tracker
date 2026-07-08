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

        res.status(201).json({

    accessToken,

    user: {

        userId:
            user.userId,

        name:
            user.name,

        email:
            user.email,

        role:
            user.role,

        companyId:
            user.companyId,

        companyName:user.companyName

    }

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

        res.status(201).json({

    accessToken,

    user: {

        userId:
            user.userId,

        name:user.name,

        email:
            user.email,

        role:
            user.role,

        companyId:
            user.companyId,

        companyName:user.companyName

    }

});
       
    }
);

const createRecruiter =
    asyncHandler(

    async (req, res) => {

        const recruiter = 
            await authService
                .createRecruiter({

                    companyId:
                        req.user.companyId,

                    companyName:req.user.companyName,

                    name:req.body.name,

                    email:
                        req.body.email,

                    password:
                        req.body.password
                });

        res.status(201).json({

            message:
                'Recruiter created',

            user:
                recruiter
        });
    }
);

const login = asyncHandler(

    async (req, res) => {

        const user =
            await authService.login(
                req.body
            );
        
        console.log(
    "LOGIN USER:",
    user
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
            accessToken,
            user: {

        userId:
            user.userId,
        
        name:user.name,

        email:
            user.email,

        role:
            user.role,

        companyId:
            user.companyId,

        companyName:user.companyName

    }
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
            newRefreshToken
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
            accessToken,
            user: {

        userId:
            user.userId,

        name:user.name,

        email:
            user.email,

        role:
            user.role,

        companyId:
            user.companyId,

        companyName:user.companyName
    }
        });
    }
);

const getRecruiters =
    asyncHandler(

    async (req, res) => {

        const recruiters =
            await authService
                .getRecruiters(

                    req.user.companyId
                );

        res.json({

            success: true,

            count:
                recruiters.length,

            data:
                recruiters
        });
    }
);

module.exports = {
    signupCandidate,
    signupCompany,
    createRecruiter,
    login,
    refreshAccessToken,
    getMe,
    logout,
    googleCallback,
    getRecruiters
};