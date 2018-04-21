const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const bundleExtractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css',
});

const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/dist"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    devtool: 'eval-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ['env', 'stage-2'] }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ['css-hot-loader'].concat(bundleExtractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [require('autoprefixer')]
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })),
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|eot|woff|woff2)$/,
                loader: 'file-loader',
            },
        ]
    },
    plugins: [
        autoprefixer,
        bundleExtractPlugin,
        new HtmlWebpackPlugin({
            hash: true,
            filename: './src/index.html',
            template: './src/index.html'
        }),
    ]
};
