const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const { resolve } = require('dns');
const { default: axios } = require('axios');
module.exports = (env, argv) => {
    const mode = "development"
    const config = {
        mode,
        devServer: {
            compress: true,
            port: 9000,
            hot: true,
        },
        entry: {
            content: './page/content/index.js',   // 如果你的 content 目录下有对应的 js
            login: './page/login/index.js',       // 如果没有，可以先指向一个新建的空本地 js 文件
            publish: './page/publish/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[contenthash].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './page/content/index.html',
                filename: 'content/index.html', // 打包输出到 dist/content.html
                chunks: ['content'],       // 只自动注入上面 entry 里对应的 content.js
                useCDN: mode === "production"
            }),
            new HtmlWebpackPlugin({
                template: './page/login/index.html',
                filename: 'login/index.html',   // 打包输出到 dist/login.html
                chunks: ['login'],
                useCDN: mode === "production"
            }),
            new HtmlWebpackPlugin({
                template: './page/publish/index.html',
                filename: 'publish/index.html', // 打包输出到 dist/publish.html
                chunks: ['publish'],
                useCDN: mode === "production"
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css'
            })],

        module: {
            rules: [
                // 3. 配置 html-loader，自动帮你打包 HTML 内部引用的本地图片(如 login-bg.png)和本地 CSS
                // 遇到 cdn 链接它会自动忽略放行

                // 4. 支持本地 CSS 的打包（如果你 HTML 里用了本地的 index.css）
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        },
        resolve: {
            alias: {
                "@": path.join(__dirname, "utils/"),
            }
        }
    };
    if (config.mode === "development") {
        config.devtool = "inline-source-map";
    } else {
        config.externals = {
            axios: "axios"
        }
    }
    return config
}
