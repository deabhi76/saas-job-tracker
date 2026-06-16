const pool =
    require('../config/db');

async function createApplication({

    jobId,

    candidateId,

    resumeUrl,

    priorityScore

}) {

    const query = `

        INSERT INTO applications (

            job_id,

            candidate_id,

            resume_url,

            priority_score

        )

        VALUES ($1, $2 ,$3,$4)

        RETURNING *;

    `;

    const result =
        await pool.query(
            query,
            [jobId, candidateId,resumeUrl,priorityScore]
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

            jobs.id AS job_id,
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



module.exports = {

    createApplication,
     getApplicationsByCandidateId,
     getApplicationsForJob,
     getApplicationById,
     updateApplicationStatus

};