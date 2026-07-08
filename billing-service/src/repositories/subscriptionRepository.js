const pool = require('../db/pool');

const createSubscription = async ({
    id,
    ownerId,
    ownerType,
    planId,
    status,
    startDate,
    endDate,
    autoRenew = true
}) => {

    const query = `
        INSERT INTO subscriptions(
            id,
            owner_id,
            owner_type,
            plan_id,
            status,
            start_date,
            end_date,
            auto_renew
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *;
    `;

    const values = [
        id,
        ownerId,
        ownerType,
        planId,
        status,
        startDate,
        endDate,
        autoRenew
    ];

    const result =
        await pool.query(query, values);

    return result.rows[0];
};

const getSubscriptionById = async (id) => {

    const result =
        await pool.query(
            `
            SELECT *
            FROM subscriptions
            WHERE id = $1
            `,
            [id]
        );

    return result.rows[0];
};

const getActiveSubscription = async (
    ownerId,
    ownerType
) => {

    const result =
        await pool.query(
            `
            SELECT *
            FROM subscriptions
            WHERE owner_id = $1
            AND owner_type = $2
            AND status = 'ACTIVE'
            LIMIT 1
            `,
            [ownerId,ownerType]
        );

    return result.rows[0];
};

const updateSubscriptionStatus = async (
    subscriptionId,
    status
) => {

    const result =
        await pool.query(
            `
            UPDATE subscriptions
            SET status = $1
            WHERE id = $2
            RETURNING *;
            `,
            [
                status,
                subscriptionId
            ]
        );

    return result.rows[0];
};

const updatePlan = async (
    subscriptionId,
    planId
) => {

    const result =
        await pool.query(
            `
            UPDATE subscriptions
            SET plan_id = $1
            WHERE id = $2
            RETURNING *;
            `,
            [
                planId,
                subscriptionId
            ]
        );

    return result.rows[0];
};

const getCurrentSubscriptionByOwner =
async (ownerId,ownerType) => {

    const result =
        await pool.query(
            `
            SELECT s.*,p.name AS plan_name, p.features
            FROM subscriptions s
            JOIN plans p
                ON s.plan_id = p.id
            WHERE s.owner_id = $1
            AND s.owner_type = $2
            AND s.status = 'ACTIVE'
            AND s.end_date > NOW()
            ORDER BY s.created_at DESC
            LIMIT 1
            `,
            [ownerId,ownerType]
        );

    return result.rows[0];
};

const getExpiredSubscriptions =
async () => {

    const result =
        await pool.query(
            `
            SELECT *
            FROM subscriptions
            WHERE status = 'ACTIVE'
            AND end_date < NOW()
            `
        );

    return result.rows;
};

module.exports = {
    createSubscription,
    getSubscriptionById,
    getActiveSubscription,
    updateSubscriptionStatus,
    updatePlan,
    getCurrentSubscriptionByOwner,
    getExpiredSubscriptions
};