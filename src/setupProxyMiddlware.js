const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/",
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );

    app.use(
        "/websocket",
        createProxyMiddleware({
            target: "http://localhost:8080",
            ws: true,
        })
    )
};