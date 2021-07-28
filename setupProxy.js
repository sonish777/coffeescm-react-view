const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://192.168.246.128:8000/api",
      changeOrigin: true,
    })
  );
};
