const pool =
    require('../config/db');

async function createApplication({

    jobId,

    candidateId,

    candidateName,

    candidateEmail,

    resumeUrl,

    priorityScore

}) {

    const query = `

        INSERT INTO applications (

            job_id,

            candidate_id,

            candidate_name,

            candidate_email,

            resume_url,

            priority_score

        )

        VALUES ($1, $2 ,$3,$4,$5,$6)

        RETURNING *;

    `;

    const result =
        await pool.query(
            query,
            [jobId, candidateId,candidateName,candidateEmail,resumeUrl,priorityScore]
        );

    return result.rows[0];

}

async function getApplicationsByCandidateId(
    candidateId
) {

    const query = `

        SELECT

            applications.id,
            applications.status,
            applications.created_at,
            applications.resume_url,

            jobs.id AS job_id,
            jobs.company_name,
            jobs.title,
            jobs.location,
            jobs.employment_type

        FROM applications

        JOIN jobs

        ON applications.job_id = jobs.id

        WHERE applications.candidate_id = $1

        ORDER BY applications.created_at DESC;

    `;

    const result =
        await pool.query(
            query,
            [candidateId]
        );

    return result.rows;

}

async function getApplicationsForJob(
    jobId
) {

    const query = `

        SELECT *

        FROM applications

        WHERE job_id = $1

        ORDER BY 
        priority_score DESC,
        created_at DESC;

    `;

    const result =
        await pool.query(
            query,
            [jobId]
        );

    return result.rows;

}

async function getApplicationById(
    applicationId
) {

    const query = `

        SELECT *

        FROM applications

        WHERE id = $1;

    `;

    const result =
        await pool.query(
            query,
            [applicationId]
        );

    return result.rows[0];

}

async function updateApplicationStatus(

    applicationId,

    status

) {

    const query = `

        UPDATE applications

        SET status = $1

        WHERE id = $2

        RETURNING *;

    `;

    const result =
        await pool.query(
            query,
            [status, applicationId]
        );

    return result.rows[0];

}

async function hasApplied(
    candidateId,
    jobId
) {

    const result =
        await pool.query(

            `
            SELECT EXISTS(

                SELECT 1

                FROM applications

                WHERE candidate_id = $1
                AND job_id = $2

            ) AS applied
            `,

            [
                candidateId,
                jobId
            ]

        );

    return result.rows[0].applied;
}



module.exports = {

    createApplication,
     getApplicationsByCandidateId,
     getApplicationsForJob,
     getApplicationById,
     updateApplicationStatus,
     hasApplied

};