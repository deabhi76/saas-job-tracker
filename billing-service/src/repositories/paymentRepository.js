const pool = require('../db/pool');

const createPayment = async ({
    id,
    subscriptionId,
    amount,
    status,
    providerReference
}) => {

    const query = `
        INSERT INTO payments(
            id,
            subscription_id,
            amount,
            status,
            provider_reference
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;
    `;

    const values = [
        id,
        subscriptionId,
        amount,
        status,
        providerReference
    ];

    const result =
        await pool.query(query, values);

    return result.rows[0];
};

const getPaymentById = async (
    paymentId
) => {

    const result =
        await pool.query(
            `
            SELECT *
            FROM payments
            WHERE id = $1
            `,
            [paymentId]
        );

    return result.rows[0];
};

const updatePaymentStatus = async (
    paymentId,
    status
) => {

    const result =
        await pool.query(
            `
            UPDATE payments
            SET status = $1
            WHERE id = $2
            RETURNING *;
            `,
            [
                status,
                paymentId
            ]
        );

    return result.rows[0];
};

const getPaymentsForSubscription =
async (subscriptionId) => {

    const result =
        await pool.query(
            `
            SELECT *
            FROM payments
            WHERE subscription_id = $1
            ORDER BY created_at DESC
            `,
            [subscriptionId]
        );

    return result.rows;
};

const getPaymentsByOwner =
async (
    ownerId,
    ownerType
) => {

    const result =
        await pool.query(

            `
            SELECT p.*
            FROM payments p
            JOIN subscriptions s
                ON p.subscription_id = s.id
            WHERE s.owner_id = $1
            AND s.owner_type = $2
            ORDER BY p.created_at DESC
            `,

            [ownerId, ownerType]
        );

    return result.rows;
};

module.exports = {
    createPayment,
    getPaymentById,
    updatePaymentStatus,
    getPaymentsForSubscription,
    getPaymentsByOwner
};