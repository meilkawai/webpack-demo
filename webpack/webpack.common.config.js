// node 环境中的js文件，按照commonjs语法
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
module.exports = {
    entry: {
        home: resolve('../src/pages/home/index.tsx'),  // Home 页面入口
        about: resolve('../src/pages/about/index.tsx') // About 页面入口
    },
    output: {
        filename: devMode ? '[name].[hash].js' : '[name].[contenthash].js', // 动态生成不同的文件名
        chunkFilename: devMode ? 'chunks/[name].[hash:4].js' : 'chunks/[name].[contenthash].js',
        path: resolve('./dist'), //打包后的路径
        publicPath: '/'  // 网站的根目录 localhost:8080/
    },
    optimization: {
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
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // 处理 TypeScript 文件
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(js|jsx)$/, // 针对 .js 和 .jsx 文件
                exclude: /node_modules/, // 排除 node_modules 目录
                use: {
                    loader: 'babel-loader', // 使用 babel-loader 处理
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                // 处理less资源
                test: /\.less$/,
                use: [
                    'style-loader', //创建style标签，将js中的样式资源插入进行，添加到head中生效
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true //启用CSS Modules
                        }
                    }, //将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ]
            },
            {
                // 处理css资源
                test: /\.css$/,
                use: [ // use数组中loader执行顺序：从右到左，从下到上 依次执行
                    'style-loader',// 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'css-loader'// 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset', // 使用 Webpack 5 的 asset 模块处理文件
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 超过 25KB 的文件将不会被内联
                    },
                },
                generator: {
                    filename: 'img/[name].[hash:4][ext]',
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'), // 设置别名 "@" 指向 "src" 目录
            '@public': path.resolve(__dirname, '../public'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'], // 自动解析扩展
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // 设置静态文件的目录
        }, // 本地服务器所加载的页面所在的目录  webpack5 需要static而不是contentBase
        compress: true, // 启用 gzip 压缩
        port: 9000, // 服务器端口
        open: true,
        proxy: {},
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
}