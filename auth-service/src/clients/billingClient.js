const axios = require('axios');

const billingClient = axios.create({

    baseURL:
        process.env.BILLING_SERVICE_URL

});

async function createDefaultSubscription(

    ownerId,

    ownerType,

    planId,

    companyAdminId = null

) {

    const response =
        await billingClient.post(

            '/internal/subscriptions',

            {

                ownerId,

                ownerType,

                planId,

                companyAdminId

            }
        );

    return response.data;
}

module.exports = {
    createDefaultSubscription
};