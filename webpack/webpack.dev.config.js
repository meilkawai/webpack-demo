const common = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    hot: true,
    // historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // Home 页的输出文件名
      template: 'src/pages/home/index.html', // Home 页的模板
      chunks: ['home'], // 只引入 home 入口的脚本
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html', // About 页的输出文件名
      template: 'src/pages/about/index.html', // About 页的模板
      chunks: ['about'], // 只引入 about 入口的脚本
    }),]
})