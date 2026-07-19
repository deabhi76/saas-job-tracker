const passport =
    require('passport');

const GoogleStrategy =
    require('passport-google-oauth20')
        .Strategy;

const userRepository =
    require('../repositories/userRepository');

const AppError =
    require('../errors/AppError');
const billingClient =
    require("../clients/billingClient");

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
    console.log("STATE:", req.query.state);
    console.log("PROFILE:", profile?.emails?.[0]?.value);
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

        console.log("Before findByEmail");

let user =
    await userRepository.findByEmail(email);



console.log("After findByEmail", user);

        if (!user) {

            if (role === "COMPANY_ADMIN") {

        return done(null, {

            oauthSignup: true,

            email,

            name: profile.displayName,

            googleId: profile.id,

            role

        });

    }

            const newUser = {

                companyId: null,

                companyName: null,

                name:
                    profile.displayName,

                email:
                    email,

                password: null,

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

            await billingClient
    .createDefaultSubscription(

        user.userId,

        "CANDIDATE",

        process.env
            .FREE_CANDIDATE_PLAN_ID

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
            console.error("GOOGLE STRATEGY ERROR:", err);
        done(err, null);
    }
}
    )
);

module.exports=passport;
