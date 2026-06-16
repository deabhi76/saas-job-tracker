const companyMetricsRepository =
    require(
        '../repositories/companyMetricsRepository'
    );

const redis =
    require(
        '../config/redis'
    );

async function getCompanyAnalytics(
    companyId
) {

    const cacheKey =
        `analytics:company:${companyId}`;

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
        await companyMetricsRepository
            .getMetrics(
                companyId
            );

    await redis.set(

        cacheKey,

        JSON.stringify(
            metrics
        ),

        'EX',

        300
    );

    return metrics;
}

module.exports = {
    getCompanyAnalytics
};