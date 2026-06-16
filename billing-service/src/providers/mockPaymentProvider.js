const processPayment = async ({
    amount
}) => {

    const success =
        Math.random() < 0.9;

    return {
        success,

        transactionId:
            `txn_${Date.now()}`,

        amount
    };
};

module.exports = {
    processPayment
};