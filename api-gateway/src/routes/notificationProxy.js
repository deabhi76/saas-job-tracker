const {

    createProxyMiddleware,

    fixRequestBody

} = require(
    'http-proxy-middleware'
);

const services =
    require('../config/services');

const notificationProxy =
    createProxyMiddleware({

        target:
            services.NOTIFICATION_SERVICE,

        changeOrigin: true,

        pathRewrite: {

            '^/api': ''

        },

        onProxyReq(
            proxyReq,
            req,
            res
        ) {

            if (

                req.method === 'POST' ||

                req.method === 'PUT' ||

                req.method === 'PATCH'

            ) {

                fixRequestBody(
                    proxyReq,
                    req
                );

            }

            if (req.user) {

                proxyReq.setHeader(

                    'x-user-id',

                    req.user.userId

                );

                proxyReq.setHeader(

                    'x-user-role',

                    req.user.role

                );

            }

        }

    });

module.exports =
    notificationProxy;