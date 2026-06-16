const pool =
    require('../config/db');

async function incrementMetric(
    metricName,
    amount = 1
) {

    await pool.query(

        `
        UPDATE analytics_metrics

        SET metric_value =
            metric_value + $1

        WHERE metric_name = $2
        `,

        [
            amount,
            metricName
        ]
    );
}

async function getAllMetrics() {

    const result =
        await pool.query(

            `
            SELECT *
            FROM analytics_metrics
            `
        );

    return result.rows;
}

module.exports={
incrementMetric,
getAllMetrics
};