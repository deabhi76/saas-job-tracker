const analyticsRepository =
    require(
        '../repositories/analyticsRepository'
    );

const redis =
    require(
        '../config/redis'
    );

async function getOverview() {

    const cacheKey =
        'analytics:overview';

    const cached =
        await redis.get(
            cacheKey
        );

    if (cached) {

        return JSON.parse(
            cached
        );
    }

    const metrics =
        await analyticsRepository
            .getAllMetrics();

    const result = {};

    for (
        const metric
        of metrics
    ) {

        result[
            metric.metric_name
        ] =
            Number(
                metric.metric_value
            );
    }

    await redis.set(

        cacheKey,

        JSON.stringify(
            result
        ),

        'EX',

        300
    );

    return result;
}

module.exports = {
    getOverview
};