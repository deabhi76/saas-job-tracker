const pool =
    require('../config/db');

async function createNotification({

    userId,

    type,

    title,

    message

}) {

    const query = `

        INSERT INTO notifications (

            user_id,

            type,

            title,

            message

        )

        VALUES ($1, $2, $3, $4)

        RETURNING *;

    `;

    const values = [

        userId,

        type,

        title,

        message

    ];

    const result =
        await pool.query(
            query,
            values
        );

    return result.rows[0];

}

async function getNotificationsByUserId(
    userId
) {

    const query = `

        SELECT *

        FROM notifications

        WHERE user_id = $1

        ORDER BY 
          is_read ASC,
          created_at DESC;

    `;

    const result =
        await pool.query(
            query,
            [userId]
        );

    return result.rows;

}

async function markAsRead(

    notificationId,

    userId

) {

    const query = `

        UPDATE notifications

        SET is_read = TRUE

        WHERE id = $1
        AND user_id = $2

        RETURNING *;

    `;

    const result =
        await pool.query(

            query,

            [

                notificationId,

                userId

            ]

        );

    return result.rows[0];

}

async function getUnreadCount(
    userId
) {

    const query = `

        SELECT COUNT(*) AS count

        FROM notifications

        WHERE user_id = $1
        AND is_read = FALSE;

    `;

    const result =
        await pool.query(

            query,

            [userId]

        );

    return Number(
        result.rows[0].count
    );

}

module.exports = {

    createNotification,

    getNotificationsByUserId,

    markAsRead,
    getUnreadCount

};