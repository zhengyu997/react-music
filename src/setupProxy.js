const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    // /api 表示代理路径
    // target 表示目标服务器的地址
        app.use('/apis', createProxyMiddleware({ 
          target: 'http://127.0.0.1:4000',//后台服务器地址
          changeOrigin: true,
          pathRewrite: {
          '^/apis': '',
          },}))
  
    // app.use(
    //     createProxyMiddleware('/api', {
    //         target: 'http://127.0.0.1:4000',
    //         changeOrigin: true,
    
    //     })
    // )
}
