const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  // 打包目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'dist_dev',
  // 当管理后台是用子路由的形式展现时，需要设置 publicPath
  // publicPath: '/admin/',
  // 不生成Map文件
  productionSourceMap: false,
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/global.less')
      ]
    }
  },
  pwa: {
    iconPaths: {
      favicon32: './img/icons/favicon-32x32.png',
      favicon16: './img/icons/favicon-32x32.png',
      appleTouchIcon: './img/icons/apple-touch-icon.png'
    }
  },
  // 设置页面title
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Digi Ads'
    }
  },
  // 配置本地域名
  devServer: {
    port: 8081,
    host: 'www.local.superdigiads.com',
    allowedHosts: ['local.superdigiads.com', 'www.local.superdigiads.com']
  }
})
