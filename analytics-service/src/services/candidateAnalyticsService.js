const candidateMetricsRepository =
    require(
        '../repositories/candidateMetricsRepository'
    );

const redis =
    require(
        '../config/redis'
    );

async function getCandidateAnalytics(
    candidateId
) {

    const cacheKey =
        `analytics:candidate:${candidateId}`;

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
        await candidateMetricsRepository
            .getMetrics(
                candidateId
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
    getCandidateAnalytics
};