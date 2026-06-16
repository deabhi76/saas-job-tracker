const pool =
    require('../db/db');

function mapUser(row) {

    if (!row) {
        return null;
    }

    return {

        userId:
            row.user_id,

        companyId:
            row.company_id,

        email:
            row.email,

        password:
            row.password,

        role:
            row.role,

        authProvider:
            row.auth_provider,

        googleId:
            row.google_id,

        createdAt:
            row.created_at
    };
}

async function createUser(user) {

    const query = `

        INSERT INTO users (

            company_id,

            email,

            password,

            role,

            auth_provider,

            google_id

        )

        VALUES ($1, $2, $3, $4, $5, $6)

        RETURNING *;
    `;

    const values = [

        user.companyId,

        user.email,

        user.password,

        user.role,

        user.authProvider,

        user.googleId || null
    ];

    const result =
        await pool.query(
            query,
            values
        );

    return mapUser(result.rows[0]);
}

async function findByEmail(email) {

    const query = `

        SELECT *

        FROM users

        WHERE email = $1;
    `;

    const result =
        await pool.query(
            query,
            [email]
        );

    return mapUser(result.rows[0]);
}

async function findById(userId) {

    const query = `

        SELECT *

        FROM users

        WHERE user_id = $1;
    `;

    const result =
        await pool.query(
            query,
            [userId]
        );

    return mapUser(result.rows[0]);
}

async function findRecruitersByCompanyId(
    companyId
) {

    const query = `

        SELECT *

        FROM users

        WHERE company_id = $1

        AND role = 'RECRUITER'

        ORDER BY created_at DESC;
    `;

    const result =
        await pool.query(

            query,

            [companyId]
        );

    return result.rows.map(
        mapUser
    );
}

module.exports = {

    createUser,

    findByEmail,

    findById,

    findRecruitersByCompanyId
};