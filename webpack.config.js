const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
    new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].css",
        chunkFilename: devMode ? "[id].css" : "[id].css",
    }),
];
if (devMode) {
    // only enable hot in development
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

const compressImgs =
{
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
        {
            loader: ImageMinimizerPlugin.loader,
            options: {
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            // ["optipng", { optimizationLevel: 5 }],
                            "imagemin-gifsicle",
                            "imagemin-mozjpeg",
                            "imagemin-pngquant",
                            "imagemin-svgo",
                        ],
                    },
                },
            },
        },
    ],
};

plugins.push(new HtmlWebpackPlugin({
    title: 'Tesla Calculations',
    filename: path.resolve(__dirname, 'dist/index.html'),
    template: path.resolve(__dirname, 'src/index.html'),

}));

plugins.push(
    new webpack.PrefetchPlugin(path.join(__dirname, "images/icon-fan-gray.svg")),
    new webpack.PrefetchPlugin(path.join(__dirname, "images/icon-wave-gray.svg")),
    new webpack.PrefetchPlugin(path.join(__dirname, "images/icon-fan-white.svg")),
    new webpack.PrefetchPlugin(path.join(__dirname, "images/icon-wave-white.svg")),
)

module.exports = {
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
        chunkFilename: "[name].js",
    },
    devServer: {
        // hot: true,
        inline: true,
        stats: {
            colors: true,
            chunks: false
        }
    },
    watch: true,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                extractComments: true,
                terserOptions: {},
            }),
        ],
        splitChunks: {
            chunks: "all",
        },
    },
    plugins,
    resolve: {
        alias: {
            appcomponents: path.resolve(__dirname, 'src/components/'),
            appdata: path.resolve(__dirname, 'data/'),
            appimages: path.resolve(__dirname, 'images/'),
            appservice: path.resolve(__dirname, 'src/service/'),
            apputils: path.resolve(__dirname, 'src/utils/'),
        },
    },
    target: ['web', 'browserslist'],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            compressImgs,
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'img/[name][ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[name][ext]',
                }
            },
        ],
    },
};
