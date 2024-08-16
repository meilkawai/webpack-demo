# 运行
```
yarn build:dev 打包
yarn start 启动 webpack-dev-server
yarn test 运行打包后文件
```
# 使用到的配置：
## entry 作用：打包的入口文件
## output 作用：打包后输出的文件
    ### filename 输出的文件名
    ### path: 打包后的路径
    ### publicPath: 加载资源的根目录
## module - rules：解析器规则
    ### test：处理什么文件，正则匹配
    ### exclude: 排除哪些文件
    ### use：使用什么loader
        #### options
            ##### presets: 预设如何转换
            ##### modules: 是否启用modules，开启后可以在import styles from './index.less'

    解析 ts，css，less，jpg等资源，其中ts需要根据global.d.ts与tsconfig配合解析
## resolve: 解析时自动补全的文件扩展名
## devServer：webpack-dev-server
## plugins 每次打包自动清理dist目录等
## externals 排除依赖, 通过CDN方式重新注入
## optimization 配置代码优化和压缩