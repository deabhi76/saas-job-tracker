const userRepository =
    require('../repositories/userRepository');

const {
    hashPassword,
    comparePassword
} = require('../utils/hash');

const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require('../utils/jwt');

const AppError =
    require('../errors/AppError');

const tokenRepository =
    require('../repositories/tokenRepository');

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

    const hashedPassword =
        await hashPassword(data.password);

    const user = {

        companyId: data.companyId,

        email: data.email,

        password: hashedPassword,

        role: data.role,

        authProvider: 'LOCAL',

        createdAt: new Date()
    };

    await userRepository.createUser(user);

    delete user.password;

    return user;
}

async function login(data) {

    const user = await userRepository.findByEmail(data.email)
    
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

module.exports = {
    signup,
    login,
    refreshAccessToken,
    logout
};