const userRepository =
    require('../repositories/userRepository');

const {
    hashPassword,
    comparePassword
} = require('../utils/hash');

const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    verifyCompanySignupToken
} = require('../utils/jwt');
const billingClient =
    require(
        '../clients/billingClient'
    );
const AppError =
    require('../errors/AppError');

const tokenRepository =
    require('../repositories/tokenRepository');

const companyRepository =
    require(
        '../repositories/companyRepository'
    );

const sessionService =
    require("./sessionService");

async function signup(data) {

    const existingUser =await userRepository.findByEmail(data.email)

    if (existingUser) {
        throw new AppError(
            'User already exists',
            400
        );
    }

    const validRoles = [

    'SUPER_ADMIN',

    'COMPANY_ADMIN',

    'RECRUITER',

    'CANDIDATE'
];

if (
    !validRoles.includes(
        data.role
    )
) {

    throw new AppError(
        'Invalid role',
        400
    );
}

   


    let companyId = null;

if (
    data.role ===
    'COMPANY_ADMIN'
) {

    return await createCompanyAdminUser({

        name:
            data.name,

        email:
            data.email,

        companyName:
            data.companyName,

        password:
            data.password,

        authProvider:
            "LOCAL",

        googleId:
            null

    });

}

 const hashedPassword =
        await hashPassword(data.password);

    const user = {

        companyId,

        companyName:

    data.role === 'COMPANY_ADMIN'

        ? data.companyName

        : null,

        name: data.name,

        email: data.email,

        password: hashedPassword,

        role: data.role,

        authProvider: 'LOCAL',

        createdAt: new Date()
    };

   console.log("Creating user"); 
    await userRepository
    .createUser(user);
console.log("User created");
const createdUser =
    await userRepository
        .findByEmail(
            user.email
        );

        console.log("Created user found");
console.log(
    "Created User:",
    createdUser
);
console.log("Before billing call");

// if (

//     createdUser.role ===
//     'COMPANY_ADMIN'

// ) {

//     await billingClient
//         .createDefaultSubscription(

//             createdUser.companyId,

//             'COMPANY',

//             process.env
//                 .FREE_COMPANY_PLAN_ID,

//             createdUser.userId
//         );
// }

if (

    createdUser.role ===
    'CANDIDATE'

) {

    await billingClient
        .createDefaultSubscription(

            createdUser.userId,

            'CANDIDATE',

            process.env
                .FREE_CANDIDATE_PLAN_ID
        );
}
console.log("After billing call");

delete user.password;

return createdUser;
}

async function createRecruiter({

    companyId,

    companyName,

    name,

    email,

    password

}) {

    const existingUser =
        await userRepository
            .findByEmail(
                email
            );

    if (existingUser) {

        throw new AppError(

            'User already exists',

            400
        );
    }

    const hashedPassword =
        await hashPassword(
            password
        );

    const recruiter = {

        companyId,

        companyName,

        name,

        email,

        password:
            hashedPassword,

        role:
            'RECRUITER',

        authProvider:
            'LOCAL',

        createdAt:
            new Date()
    };

    await userRepository
        .createUser(
            recruiter
        );

    const createdRecruiter =
    await userRepository
        .findByEmail(
            recruiter.email
        );

    delete recruiter.password;

     await billingClient
        .createDefaultSubscription(

            createdRecruiter.userId,

            'CANDIDATE',

            process.env
                .FREE_CANDIDATE_PLAN_ID
        );

    return recruiter;
}

async function login(data) {

    const user = await userRepository.findByEmail(data.email)
    console.log(
        "USER FOUND:",
        user
    );

    if (!user) {
        throw new AppError(
            'Invalid credentials',
            401
        );
    }

    const validPassword =
        await comparePassword(
            data.password,
            user.password
        );

        console.log("password valid:",validPassword);

    if (!validPassword) {
        throw new AppError(
            'Invalid credentials',
            401
        );
    }


    return user;
}

async function refreshAccessToken(
    refreshToken
) {
    if (!refreshToken) {

    throw new AppError(
        'Refresh token required',
        401
    );
}

    if (
        !(await tokenRepository.exists(
            refreshToken
        ))
    ) {

        throw new AppError(
            'Invalid refresh token',
            401
        );
    }

    let decoded;

        try {

            decoded =
                verifyRefreshToken(
                    refreshToken
                );

        } catch (err) {

            throw new AppError(
                'Invalid or expired refresh token',
                401
            );
        }

    const user =
        await userRepository.findById(
            decoded.userId
        );

    if (!user) {

        throw new AppError(
            'User not found',
            404
        );
    }

    await tokenRepository.remove(
    refreshToken
);


console.log(user);

const newAccessToken =
    generateAccessToken(user);

const newRefreshToken =
    generateRefreshToken(user);

await tokenRepository
    .saveRefreshToken(
        newRefreshToken,
        user.userId
    );

return {

    accessToken:
        newAccessToken,

    refreshToken:
        newRefreshToken
};
}

async function logout(refreshToken) {

    if(!refreshToken)return;

    await tokenRepository.remove(
        refreshToken
    );
}

async function getRecruiters(
    companyId
) {

    return await userRepository
        .findRecruitersByCompanyId(
            companyId
        );
}

async function completeGoogleCompanySignup({
    token,
    companyName
}) {

    let decoded;

    try {

        decoded =
            verifyCompanySignupToken(
                token
            );

    } catch (err) {

        throw new AppError(
            "Invalid or expired signup token",
            401
        );

    }

    const user =
        await createCompanyAdminUser({

            name:
                decoded.name,

            email:
                decoded.email,

            companyName,

            password:
                null,

            authProvider:
                "GOOGLE",

            googleId:
                decoded.googleId

        });

    const {

        accessToken,

        refreshToken

    } =
        await sessionService
            .createSession(user);

    return {

        accessToken,

        refreshToken,

        user

    };

}

async function createCompanyAdminUser({

    name,

    email,

    companyName,

    password,

    authProvider,

    googleId

}) {

    const existingUser =
        await userRepository.findByEmail(email);

    if (existingUser) {

        throw new AppError(
            "User already exists",
            400
        );
    }

    let hashedPassword = null;

    if (password) {

        hashedPassword =
            await hashPassword(password);

    }

    const company =
        await companyRepository
            .createCompany(companyName);

    const user = {

        companyId:
            company.company_id,

        companyName,

        name,

        email,

        password:
            hashedPassword,

        role:
            "COMPANY_ADMIN",

        authProvider,

        googleId

    };

    await userRepository.createUser(user);

    const createdUser =
        await userRepository.findByEmail(email);

    await billingClient
        .createDefaultSubscription(

            createdUser.companyId,

            "COMPANY",

            process.env.FREE_COMPANY_PLAN_ID,

            createdUser.userId

        );

    return createdUser;

}

module.exports = {
    signup,
    createRecruiter,
    getRecruiters,
    login,
    refreshAccessToken,
    logout,
    completeGoogleCompanySignup
};