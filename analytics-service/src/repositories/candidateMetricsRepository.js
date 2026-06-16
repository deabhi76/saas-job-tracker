const pool =
    require('../config/db');

async function ensureCandidate(
    candidateId
) {

    await pool.query(

        `
        INSERT INTO candidate_metrics
        (
            candidate_id
        )
        VALUES ($1)

        ON CONFLICT
        (
            candidate_id
        )
        DO NOTHING
        `,

        [candidateId]
    );
}

async function incrementMetric(
    candidateId,
    field
) {

    await ensureCandidate(
        candidateId
    );

    await pool.query(

        `
        UPDATE candidate_metrics

        SET ${field} =
            ${field} + 1

        WHERE candidate_id = $1
        `,

        [candidateId]
    );
}

async function getMetrics(
    candidateId
) {

    const result =
        await pool.query(

            `
            SELECT *
            FROM candidate_metrics
            WHERE candidate_id = $1
            `,

            [candidateId]
        );

    return result.rows[0];
}

module.exports = {

    incrementMetric,

    getMetrics
};