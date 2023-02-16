const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  target: "https://api.nftgeek.app",
  changeOrigin: true,
  pathRewrite: {
    "^/geek-api": "/api",
  },
};

module.exports = function (app) {
  app.use("/geek-api", createProxyMiddleware(proxy));
};
