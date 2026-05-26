const passport =
    require('passport');

const GoogleStrategy =
    require('passport-google-oauth20')
        .Strategy;

const userRepository =
    require('../repositories/userRepository');

const AppError =
    require('../errors/AppError');

passport.use(

    new GoogleStrategy(

        {
            clientID:
                process.env
                    .GOOGLE_CLIENT_ID,

            clientSecret:
                process.env
                    .GOOGLE_CLIENT_SECRET,

            callbackURL:
                process.env
                    .GOOGLE_CALLBACK_URL,

            passReqToCallback:true
        },

        async (

    req,

    accessToken,

    refreshToken,

    profile,

    done

) => {

    try {

        const role =
            req.query.state;

        const allowedRoles = [

            'CANDIDATE',

            'COMPANY_ADMIN'
        ];

        if (

            !allowedRoles.includes(
                role
            )

        ) {

        return done(
            new AppError(
                'Invalid OAuth role',
                400
            ),
            null
        );
        }

        if (

    !profile.emails ||

    !profile.emails.length

) {

        return done(

            new AppError(
                'Google email not found',
                400
            ),

            null
        );
}

const email =

    profile
        .emails[0]
        .value
        .toLowerCase();

        let user =
            await userRepository
                .findByEmail(

                    email
                );

        if (!user) {

            const newUser = {

                companyId: null,

                email:
                    email,

                role,

                authProvider:
                    'GOOGLE',

                googleId:
                    profile.id,

                createdAt:new Date()
            };

            user =
                await userRepository
                    .createUser(
                        newUser
                    );
        }
        else{

        if (

    user.role !== role

) {

    return done(

        new AppError(
            'Role mismatch',
            403
        ),

        null
    );
}
        }
        done(null, user);

    } catch (err) {

        done(err, null);
    }
}
    )
);

module.exports=passport;
