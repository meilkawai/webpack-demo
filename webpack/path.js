const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntriesAndHtmlPlugins() {
    const pagesDir = path.resolve(__dirname, '../src/pages');
    const entries = {};
    const htmlPlugins = [];

    const files = fs.readdirSync(pagesDir);
    files.forEach(file => {
        const fullPath = path.join(pagesDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            const entryPath = path.join(fullPath, 'index.tsx');
            const templatePath = path.join(fullPath, 'index.html');

            if (fs.existsSync(entryPath) && fs.existsSync(templatePath)) {
                const entryName = file;
                entries[entryName] = entryPath;

                // 判断文件名是否为 "home"，如果是，则设置输出的 HTML 文件名为 "index.html"
                const outputFilename = entryName === 'home' ? 'index.html' : `${entryName}.html`;

                // 创建 HtmlWebpackPlugin 实例并推入 htmlPlugins 数组
                htmlPlugins.push(
                    new HtmlWebpackPlugin({
                        filename: outputFilename, // 动态设置输出文件名
                        template: templatePath, // 模板路径
                        chunks: [entryName], // 只引入当前页面的入口脚本
                    })
                );
            }
        }
    });

    return { entries, htmlPlugins };
}

const { entries, htmlPlugins } = getEntriesAndHtmlPlugins();
module.exports = { entries, htmlPlugins };
