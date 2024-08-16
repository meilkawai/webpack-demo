const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'public'), // 设置静态文件的目录
        compress: true, // 启用 gzip 压缩
        port: 9000, // 服务器端口
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热模块替换
    ],
});
