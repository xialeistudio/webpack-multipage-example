const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: { // 入口配置，每个页面一个入口JS
        home: './src/home/index',
        about: './src/about/index'
    },
    output: { // 输出配置
        path: path.resolve(__dirname, 'dist'), // 输出资源目录
        filename: 'scripts/[name].[hash:8].js', // JS命名规则
        chunkFilename: 'scripts/[name]:[chunkhash:8].js',
        publicPath: '/' // 资源路径前缀
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist', // 开发服务器配置
        hot: true // 热加载
    },
    module: {
        rules: [
            {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.Zepto!script-loader' // 将window.Zepto包装为CommonJS模块
            },
            {
                test: /\.less$/,
                use: [MiniCssPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['home', 'vendor', 'styles'],
            filename: 'index.html',
            template: './src/home/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            chunks: ['about', 'vendor', 'styles'],
            filename: 'about/index.html',
            template: './src/about/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssPlugin({
            filename: 'styles/[name].[contenthash:8].css',
            chunkFilename: 'styles/[name].[contenthash:8].css'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};