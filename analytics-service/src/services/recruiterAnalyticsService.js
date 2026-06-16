const recruiterMetricsRepository =
    require(
        '../repositories/recruiterMetricsRepository'
    );
const redis =
    require(
        '../config/redis'
    );

async function getRecruiterAnalytics(
    recruiterId
) {

    const cacheKey =
        `analytics:recruiter:${recruiterId}`;

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
        await recruiterMetricsRepository
            .getMetrics(
                recruiterId
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
    getRecruiterAnalytics
};