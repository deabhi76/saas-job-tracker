const pool =
    require('../config/db');

async function createJob(jobData) {

    const {

        companyId,
        createdBy,
        title,
        description,
        location,
        salaryMin,
        salaryMax,
        employmentType,
        priorityScore

    } = jobData;

    const query = `

        INSERT INTO jobs (

            company_id,
            created_by,
            title,
            description,
            location,
            salary_min,
            salary_max,
            employment_type,
            priority_score

        )

        VALUES (

            $1, $2, $3, $4,
            $5, $6, $7, $8,
            $9

        )

        RETURNING *;

    `;

    const values = [

        companyId,
        createdBy,
        title,
        description,
        location,
        salaryMin,
        salaryMax,
        employmentType,
        priorityScore

    ];

    const result =
        await pool.query(
            query,
            values
        );

    return result.rows[0];

}

async function getJobsByUserId(
    userId
) {

    const query = `

        SELECT *

        FROM jobs

        WHERE created_by = $1

        ORDER BY created_at DESC;

    `;

    const result =
        await pool.query(
            query,
            [userId]
        );

    return result.rows;

}

async function getJobById(id) {

    const query = `

        SELECT *

        FROM jobs

        WHERE id = $1;

    `;

    const result =
        await pool.query(
            query,
            [id]
        );

    return result.rows[0];

}

async function updateJob(
    id,
    jobData
) {

    const {

        title,
        description,
        location,
        salaryMin,
        salaryMax,
        employmentType

    } = jobData;

    const query = `

        UPDATE jobs

        SET

            title = $1,
            description = $2,
            location = $3,
            salary_min = $4,
            salary_max = $5,
            employment_type = $6

        WHERE id = $7

        RETURNING *;

    `;

    const values = [

        title,
        description,
        location,
        salaryMin,
        salaryMax,
        employmentType,
        id

    ];

    const result =
        await pool.query(
            query,
            values
        );

    return result.rows[0];

}

async function deleteJob(id) {

    const query = `

        DELETE FROM jobs

        WHERE id = $1

        RETURNING *;

    `;

    const result =
        await pool.query(
            query,
            [id]
        );

    return result.rows[0];

}

async function getAllJobs({

    page = 1,

    limit = 10,

    location,

    employmentType,

    search

}) {

    let query = `

        SELECT *

        FROM jobs

        WHERE 1=1

    `;

    const values = [];

    let index = 1;

    if (location) {

        query += `

            AND location = $${index}

        `;

        values.push(location);

        index++;

    }

    if (employmentType) {

        query += `

            AND employment_type = $${index}

        `;

        values.push(
            employmentType
        );

        index++;

    }

    if (search) {

        query += `

            AND (

                title ILIKE $${index}

                OR

                description ILIKE $${index}

            )

        `;

        values.push(
            `%${search}%`
        );

        index++;

    }

    query += `

        ORDER BY 
            priority_score DESC,
            created_at DESC

        LIMIT $${index}

        OFFSET $${index + 1}

    `;

    values.push(limit);

    values.push(
        (page - 1) * limit
    );

    const result =
        await pool.query(
            query,
            values
        );

    return result.rows;

}

const countJobsByRecruiter =
async (
    recruiterId
) => {

    const result =
        await pool.query(
            `
            SELECT COUNT(*)
            FROM jobs
            WHERE created_by = $1
            `,
            [recruiterId]
        );

    return Number(
        result.rows[0].count
    );
};

async function countJobsByCompanyId(
    companyId
) {

    const result =
        await pool.query(

            `
            SELECT COUNT(*)
            FROM jobs
            WHERE company_id = $1
            `,

            [companyId]
        );

    return Number(
        result.rows[0].count
    );
}

module.exports = {

    createJob,

    getJobsByUserId,

    getJobById,
    updateJob,
    deleteJob,
    getAllJobs,
    countJobsByRecruiter,
    countJobsByCompanyId

};