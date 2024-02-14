// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // You can change this path to whatever you want
    createProxyMiddleware({
      target: 'https://openapi.etsy.com',
      changeOrigin: true,
    })
  );
};
