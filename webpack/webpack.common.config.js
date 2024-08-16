const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { entries, htmlPlugins } = require('./path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: entries,
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: 'chunks/[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/', // 根目录
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // 处理 TypeScript 文件
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(js|jsx)$/, // 处理 JS 和 JSX 文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.less$/, // 处理 Less 文件
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // 根据环境使用不同的 loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]', // 自定义命名规则
                            },
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.css$/, // 处理 CSS 文件
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // 根据环境使用不同的 loader
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // 处理图片资源
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 超过 10 KB 的文件不进行 base64 转换
                    },
                },
                generator: {
                    filename: 'img/[name].[hash:4][ext]', // 图片文件名的生成规则
                },
            },
            {
                test: /\.html$/, // 处理 HTML 文件
                loader: 'html-loader',
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'), // 设置别名 "@" 指向 "src" 目录
            '@public': path.resolve(__dirname, '../public'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'], // 自动解析扩展
    },
    plugins: [
        new CleanWebpackPlugin(), // 清理 dist 目录
        ...htmlPlugins,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};
