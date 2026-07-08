const pool = require('../db/pool');

const createPlan = async ({
    id,
    name,
    ownerType,
    monthlyPrice,
    features
}) => {

    const query = `
        INSERT INTO plans(
            id,
            name,
            owner_type,
            monthly_price,
            features
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;
    `;

    const values = [
        id,
        name,
        ownerType,
        monthlyPrice,
        JSON.stringify(features)
    ];

    const result =
        await pool.query(query, values);

    return result.rows[0];
};

const getPlanById = async (id) => {

    const result =
        await pool.query(
            `SELECT *
             FROM plans
             WHERE id = $1`,
            [id]
        );

    return result.rows[0];
};

const getAllPlans = async () => {

    const result =
        await pool.query(`
            SELECT *
            FROM plans
            WHERE is_active = TRUE
            ORDER BY monthly_price;
        `);

    return result.rows;
};

const getPlansByOwnerType =
async (
    ownerType
) => {

    const result =
        await pool.query(

            `
            SELECT *
            FROM plans
            WHERE owner_type = $1
            AND is_active = TRUE
            ORDER BY monthly_price
            `,

            [ownerType]
        );

    return result.rows;
};

const deactivatePlan = async (id) => {

    const result =
        await pool.query(
            `
            UPDATE plans
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

    return result.rows[0];
};

const getFreePlanByOwnerType =
async (ownerType) => {

    const result =
        await pool.query(

            `
            SELECT *
            FROM plans
            WHERE owner_type = $1
            AND monthly_price = 0
            LIMIT 1
            `,

            [ownerType]
        );

    return result.rows[0];
};

module.exports = {
    createPlan,
    getPlanById,
    getAllPlans,
    deactivatePlan,
    getPlansByOwnerType,
    getFreePlanByOwnerType
};