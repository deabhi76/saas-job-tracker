const { v4: uuidv4 } =
    require('uuid');

const paymentRepository =
    require('../repositories/paymentRepository');

const paymentStatus =
    require('../constants/paymentStatus');

const mockPaymentProvider =
    require('../providers/mockPaymentProvider');

const createPayment =
async ({
    subscriptionId,
    amount
}) => {

    const payment =
        await paymentRepository
        .createPayment({

            id: uuidv4(),

            subscriptionId,

            amount,

            status:
                paymentStatus.PENDING,

            providerReference: null
        });

    const result =
        await mockPaymentProvider
        .processPayment({
            amount
        });

    const finalStatus =
        result.success
            ? paymentStatus.SUCCESS
            : paymentStatus.FAILED;

    const updatedPayment =
        await paymentRepository
        .updatePaymentStatus(
            payment.id,
            finalStatus
        );

    

    return {
        payment: updatedPayment,
        success: result.success,
        transactionId:result.transactionId
    };
};
const getPayments =
async (
    ownerId,
    ownerType
) => {

    return await paymentRepository
        .getPaymentsByOwner(
            ownerId,
            ownerType
        );
};

module.exports = {
    createPayment,
    getPayments
};