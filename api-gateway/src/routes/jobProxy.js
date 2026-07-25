const {

    createProxyMiddleware,

    fixRequestBody

} = require(
    'http-proxy-middleware'
);

const services =
    require('../config/services');

const jobProxy =
    createProxyMiddleware({

        target:
            services.JOB_SERVICE,

        changeOrigin: true,

        pathRewrite: {

            '^/api': ''

        },

        onProxyReq(
            proxyReq,
            req,
            res
        ) {


            if (req.user) {

                proxyReq.setHeader(

                    'x-user-id',

                    req.user.userId
                );

                proxyReq.setHeader(

                    'x-user-name',

                    req.user.name
                );

                proxyReq.setHeader(

                    'x-user-role',

                    req.user.role
                );

                proxyReq.setHeader(
                    "x-user-email",
                    req.user.email
                );

                if (
                    req.user.companyId
                ) {

                    proxyReq.setHeader(

                        'x-company-id',

                        req.user.companyId
                    );

                    proxyReq.setHeader(

                        'x-company-name',

                        req.user.companyName
                    );

                }

            }

            fixRequestBody(
                proxyReq,
                req
            );

        }

    });

module.exports =
    jobProxy;