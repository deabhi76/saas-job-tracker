const jobService =
    require('../services/jobService');

async function createJob(
    req,
    res,
    next
) {

    try {

        const companyId =
            req.headers[
                'x-company-id'
            ];

        companyName=
    req.headers['x-company-name'];

        const createdBy =
            req.headers[
                'x-user-id'
            ];

        const jobData = {

            companyId,

            companyName,

            createdBy,

            title:
                req.body.title,

            description:
                req.body.description,

            location:
                req.body.location,

            salaryMin:
                req.body.salaryMin,

            salaryMax:
                req.body.salaryMax,

            employmentType:
                req.body.employmentType

        };

        console.log(jobData);

        const job =
            await jobService
                .createJob(jobData);

        return res.status(201).json({

            success: true,

            data: job

        });

    } catch (err) {

        next(err);

    }

}

async function getMyJobs(
    req,
    res,
    next
) {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const companyId =
            req.headers[
                'x-company-id'
            ];

        const role =
            req.headers[
                'x-user-role'
            ];

        let jobs;

        if (
            role === "COMPANY_ADMIN"
        ) {

            jobs =
                await jobService
                    .getJobsByCompanyId(
                        companyId
                    );

        } else {

            jobs =
                await jobService
                    .getJobsByUserId(
                        userId
                    );

        }

        return res.json({

            success: true,

            count:
                jobs.length,

            data: jobs

        });

    } catch (err) {

        next(err);

    }

}

async function updateJob(
    req,
    res,
    next
) {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const role =
            req.headers[
                'x-user-role'
            ];

        const companyId =
            req.headers[
                'x-company-id'
            ];


        const updatedJob =
            await jobService
                .updateJob(

                    req.params.id,

                    userId,

                    role,

                    companyId,

                    req.body

                );

        return res.json({

            success: true,

            data: updatedJob

        });

    } catch (err) {

        next(err);

    }

}

async function deleteJob(
    req,
    res,
    next
) {

    try {

        const userId =
            req.headers[
                'x-user-id'
            ];

        const role =
    req.headers[
        'x-user-role'
    ];

const companyId =
    req.headers[
        'x-company-id'
    ];

await jobService.deleteJob(

    req.params.id,

    userId,

    role,

    companyId
);

        return res.json({

            success: true,

            message:
                'Job deleted successfully'

        });

    } catch (err) {

        next(err);

    }

}

async function getAllJobs(
    req,
    res,
    next
) {

    try {

        const {

            page,

            limit,

            location,

            employmentType,

            search

        } = req.query;

        const jobs =
            await jobService
                .getAllJobs({

                    page:
                        Number(page) || 1,

                    limit:
                        Number(limit) || 10,

                    location,

                    employmentType,

                    search

                });

        return res.json({

            success: true,

            count:
                jobs.length,

            data: jobs

        });

    } catch (err) {

        next(err);

    }

}

async function getJobById(
    req,
    res,
    next
) {

    try {

        const job =
            await jobService
                .getJobById(
                    req.params.id
                );

        return res.json({

            success: true,

            data: job

        });

    } catch(err) {

        next(err);

    }

}

module.exports = {

    createJob,
    getMyJobs,
    updateJob,
    deleteJob,
    getAllJobs,
    getJobById

};