const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/index.tsx"),
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css", ".scss", ".sass"],
    },
    module: {
        rules: [
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "resolve-url-loader", "sass-loader"],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "resolve-url-loader", "sass-loader"],
                exclude: /\.module\.(sa|sc|c)ss$/,
            },
            { test: /\.(ts|js)x?$/, exclude: /node_modules/, use: "babel-loader" },
            { test: /\.(png|jpg|jpeg|gif)$/i, type: "asset/resource" },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: "asset/inline",
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].[hash].js",
    },
    plugins: [
        new HtmlWebPackPlugin({ filename: "index.html", template: path.resolve(__dirname, "public/index.html") }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, "public/logo.png") }],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),
    ],
};
