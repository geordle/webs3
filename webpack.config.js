const path = require("path");
const webpack = require("webpack");
const PrettierPlugin = require("prettier-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
require("babel-polyfill");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components|build|dist)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        },
        {
            test: /\.global.css$/,
            use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                "file-loader"
            ]
        },
        {
            test: /\.min.css$/,
            use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
            test: /(?<!global|min)\.css$/,
            use: "raw-loader",
        },
        {
            test: /\.html$/,
            use: "raw-loader",
        },
        //only for bootstrap
        {
            test: /\.(scss)$/,
            use: [{
                loader: "style-loader", // inject CSS to page
            }, {
                loader: "css-loader", // translates CSS into CommonJS modules
            }, {
                loader: "postcss-loader", // Run post css actions
                options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                            require("precss"),
                            require("autoprefixer")
                        ];
                    }
                }
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Monster Zoo",
        favicon : "icon.png"
    }), new MiniCssExtractPlugin({
        filename: "style.css",
    })],
    stats: {
        colors: true,
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true
    },
};
