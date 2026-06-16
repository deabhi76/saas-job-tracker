const pool =
    require('../db/db');

async function createCompany(
    companyName
) {

    const query = `

        INSERT INTO companies (

            company_name

        )

        VALUES ($1)

        RETURNING *;

    `;

    const result =
        await pool.query(
            query,
            [companyName]
        );

    return result.rows[0];

}

module.exports = {

    createCompany

};