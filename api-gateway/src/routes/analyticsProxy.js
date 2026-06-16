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
            services.ANALYTICS_SERVICE,

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

                    'x-user-role',

                    req.user.role
                );

                if (
                    req.user.companyId
                ) {

                    proxyReq.setHeader(

                        'x-company-id',

                        req.user.companyId
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