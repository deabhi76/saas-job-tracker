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
    console.error("========== AUTH PROXY ERROR ==========");
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error(err);
    console.error("======================================");

    if (!res.headersSent) {
        res.status(502).json({
            success: false,
            message: err.message,
            code: err.code
        });
    }
}

    });

module.exports = authProxy;