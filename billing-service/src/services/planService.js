const planRepository =
    require('../repositories/planRepository');

const AppError =
    require('../utils/AppError');

const getPlanById =
async (planId) => {

    const plan =
        await planRepository.getPlanById(
            planId
        );

    if(!plan) {
        throw new AppError(
            'Plan not found',
            404
        );
    }

    return plan;
};

const getAllPlans =
async () => {

    return await planRepository
        .getAllPlans();
};

const getPlansByOwnerType =
async (
    ownerType
) => {

    return await
        planRepository
            .getPlansByOwnerType(
                ownerType
            );
};

module.exports = {
    getPlanById,
    getAllPlans,
    getPlansByOwnerType
};