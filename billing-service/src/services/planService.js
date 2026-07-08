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

const getFreePlanByOwnerType =
async (ownerType) => {

    const plan =
        await planRepository
            .getFreePlanByOwnerType(
                ownerType
            );

    if (!plan) {

        throw new AppError(
            'Free plan not found',
            404
        );
    }

    return plan;
};

module.exports = {
    getPlanById,
    getAllPlans,
    getPlansByOwnerType,
    getFreePlanByOwnerType
};