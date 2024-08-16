const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', // CSS 文件名的生成规则
            chunkFilename: 'chunks/[name].[contenthash].css',
        }),
    ],
    optimization: {
      minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // 移除 console.log 语句
                    },
                },
            }),
            new CssMinimizerPlugin(), // 压缩 CSS
        ],
      usedExports: true,
      runtimeChunk: {
          name: 'runtime'
      },
      splitChunks: {
          chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
          minSize: 30000, // 模块超过30k自动被抽离成公共模块
          minChunks: 1, // 模块被引用>=1次，便分割
          name: false, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
          automaticNameDelimiter: '~', // 命名分隔符
          cacheGroups: { // 控制代码拆分和模块缓存
              default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                  minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                  priority: -20, // 优先级
                  reuseExistingChunk: true, // 默认使用已有的模块
              },
              vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendor',
                  // minChunks: 2,
                  priority: -10,// 确定模块打入的优先级
                  reuseExistingChunk: true,// 使用复用已经存在的模块
                  enforce: true,
              },
              antd: {
                  test: /[\\/]node_modules[\\/]antd/,
                  name: 'antd',
                  priority: 15,
                  reuseExistingChunk: true,
              },
              react: {
                  test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                  name: 'react-vendors',
                  chunks: 'all',
                  priority: 20,
                  reuseExistingChunk: true,
              },
          },
      },
  },
});
