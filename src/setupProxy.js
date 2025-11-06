const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/v1/employee',
    createProxyMiddleware({
      target: 'http://cloud.aptgetswag.shop:8080',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/salary',
    createProxyMiddleware({
      target: 'http://cloud.aptgetswag.shop:8080',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/attendance',
    createProxyMiddleware({
      target: 'http://cloud.aptgetswag.shop:5001',
      changeOrigin: true,
    })
  );
};
