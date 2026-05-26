const {
    createProxyMiddleware,
    fixRequestBody
} = require('http-proxy-middleware');

const services =
    require('../config/services');

const authProxy =
    createProxyMiddleware({

        target:
            services.AUTH_SERVICE,

        changeOrigin: true,

        pathRewrite: {
            '^/api': ''
        },

        onProxyReq(proxyReq, req, res) {

            fixRequestBody(
                proxyReq,
                req
            );

            console.log(
                'Forwarding to auth service:',
                req.url
            );

        },

        onError(err, req, res) {

            console.error(
                'Proxy Error:',
                err
            );

        }

    });

module.exports = authProxy;