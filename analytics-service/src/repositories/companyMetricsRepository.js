const pool =
    require('../config/db');

async function ensureCompany(
    companyId
) {

    await pool.query(

        `
        INSERT INTO company_metrics
        (
            company_id
        )
        VALUES ($1)

        ON CONFLICT
        (
            company_id
        )
        DO NOTHING
        `,

        [companyId]
    );
}

async function incrementMetric(
    companyId,
    field
) {

    await ensureCompany(
        companyId
    );

    await pool.query(

        `
        UPDATE company_metrics

        SET ${field} =
            ${field} + 1

        WHERE company_id = $1
        `,

        [companyId]
    );
}

async function getMetrics(
    companyId
) {

    const result =
        await pool.query(

            `
            SELECT *
            FROM company_metrics
            WHERE company_id = $1
            `,

            [companyId]
        );

    return result.rows[0];
}

module.exports = {

    incrementMetric,

    getMetrics
};