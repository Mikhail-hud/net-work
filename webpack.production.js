const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: { format: { comments: false } },
                extractComments: false,
            }),
        ],
    },
};
