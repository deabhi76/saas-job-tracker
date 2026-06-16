const axios =
    require('axios');

const billingApi =
    axios.create({

        baseURL:
            process.env.BILLING_SERVICE_URL
    });

// const getFeatures =
// async (
//     ownerId
// ) => {

//     const response =
//         await billingApi.get(

//             `/api/billing/features/${ownerId}`
//         );

//     return response.data.data;
// };

const getCompanyFeatures =
async (
    companyId
) => {

    const response =
        await billingApi.get(

            '/api/billing/features/company',

            {
                headers: {
                    'x-company-id':
                        companyId
                }
            }
        );

    return response.data.data;
};

const getPersonalFeatures =
async (
    userId
) => {

    const response =
        await billingApi.get(

            '/api/billing/features/personal',

            {
                headers: {
                    'x-user-id':
                        userId
                }
            }
        );

    return response.data.data;
};

module.exports = {
    getCompanyFeatures,
    getPersonalFeatures
};