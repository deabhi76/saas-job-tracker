const pool =
    require('../config/db');

async function ensureRecruiter(
    recruiterId
) {

    await pool.query(

        `
        INSERT INTO recruiter_metrics
        (
            recruiter_id
        )
        VALUES ($1)

        ON CONFLICT
        (
            recruiter_id
        )
        DO NOTHING
        `,

        [recruiterId]
    );
}

async function incrementMetric(
    recruiterId,
    field
) {

    await ensureRecruiter(
        recruiterId
    );

    await pool.query(

        `
        UPDATE recruiter_metrics

        SET ${field} =
            ${field} + 1

        WHERE recruiter_id = $1
        `,

        [recruiterId]
    );
}

async function getMetrics(
    recruiterId
) {

    const result =
        await pool.query(

            `
            SELECT *
            FROM recruiter_metrics
            WHERE recruiter_id = $1
            `,

            [recruiterId]
        );

    return result.rows[0];
}

module.exports = {

    incrementMetric,

    getMetrics
};