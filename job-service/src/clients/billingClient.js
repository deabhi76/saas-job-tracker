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

   console.log(
        "Calling Billing for company:",
        companyId
    );

    console.log("BILLING_SERVICE_URL =", process.env.BILLING_SERVICE_URL);

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

    console.log(
        "Billing response:",
        response.data
    );

    return response.data.data;
};

const getPersonalFeatures =
async (
    userId
) => {

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
};

module.exports = {
    getCompanyFeatures,
    getPersonalFeatures
};