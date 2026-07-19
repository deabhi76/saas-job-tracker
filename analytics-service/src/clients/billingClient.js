const axios =
    require('axios');

const billingApi =
    axios.create({

        baseURL:
            process.env.BILLING_SERVICE_URL
    });

async function getCompanyFeatures(
    companyId
) {

    const response =
        await billingApi.get(

            '/billing/features/company',

            {
                headers: {

                    'x-company-id':
                        companyId
                }
            }
        );

    return response.data.data;
}

async function getPersonalFeatures(
    userId
) {

    const response =
        await billingApi.get(

            '/billing/features/personal',

            {
                headers: {

                    'x-user-id':
                        userId
                }
            }
        );

    return response.data.data;
}

module.exports = {

    getCompanyFeatures,

    getPersonalFeatures
};