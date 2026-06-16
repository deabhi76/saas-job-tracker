const analyticsService =
    require(
        '../services/analyticsService'
    );
const recruiterAnalyticsService =
    require(
        '../services/recruiterAnalyticsService'
    );
const companyAnalyticsService =
    require(
        '../services/companyAnalyticsService'
    );

const candidateAnalyticsService =
    require(
        '../services/candidateAnalyticsService'
    );

const billingClient =
    require(
        '../clients/billingClient'
    );

const AppError =
    require(
        '../errors/AppError'
    );

async function getRecruiterAnalytics(
    req,
    res,
    next
) {

    try {


        const recruiterId =
            req.headers[
                'x-user-id'
            ];

        const data =
            await recruiterAnalyticsService
                .getRecruiterAnalytics(

                    recruiterId
                );

        res.status(200).json({

            success: true,

            data
        });

    } catch(error) {

        next(error);
    }
}
async function getOverview(
    req,
    res,
    next
) {

    try {

        const data =
            await analyticsService
                .getOverview();

        res.status(200).json({

            success: true,

            data
        });

    } catch(error) {

        next(error);
    }
}

async function getCompanyAnalytics(
    req,
    res,
    next
) {

    try {

        const companyId =
            req.headers[
                'x-company-id'
            ];

        const features =
            await billingClient
                .getCompanyFeatures(
                    companyId
                );

        if (
            !features.premiumAnalytics
        ) {

            throw new AppError(
                'Premium Analytics required',
                403
            );
        }

        const data =
            await companyAnalyticsService
                .getCompanyAnalytics(
                    companyId
                );

        res.status(200).json({

            success: true,

            data
        });

    } catch(error) {

        next(error);
    }
}

async function getCandidateAnalytics(
    req,
    res,
    next
) {

    try {

        const candidateId =
            req.headers[
                'x-user-id'
            ];

        const features =
            await billingClient
                .getPersonalFeatures(
                    candidateId
                );

        if (
            !features.applicationAnalytics
        ) {

            throw new AppError(
                'Premium Analytics required',
                403
            );
        }

        const data =
            await candidateAnalyticsService
                .getCandidateAnalytics(
                    candidateId
                );

        res.status(200).json({

            success: true,

            data
        });

    } catch(error) {

        next(error);
    }
}

module.exports = {
    getOverview,
    getRecruiterAnalytics,
    getCandidateAnalytics,
    getCompanyAnalytics
};