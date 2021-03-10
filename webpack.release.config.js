/* --------------- modules & plugins --------------------------- */

const path = require("path");
const merge = require("webpack-merge");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.config.js");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminWebp = require("imagemin-webp");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/* --------------- const ------------------------------------- */

let paths = baseWebpackConfig.externals.paths;

/* --------------- functions --------------------------------- */

/* ---------------- module.exports -------------------------- */

const releaseWebpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    cache: false,
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(), // optimize & minimize CSS
            new TerserWebpackPlugin({
                terserOptions: {
                    output: {
                        comments: /!/i, // save /*!comments*/
                    },
                },
                extractComments: false
            }) // optimize & minimize JS
        ]
    },
    entry: {
        index: ["@babel/polyfill", "./js/index.js"]
    },
    output: {
        path: paths.dist.release.abs,
        publicPath: paths.root.release.rel
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true // очищать неиспользуемое при ребилде?
        }),
        new CopyWebpackPlugin([
            { from: "./.htaccess.release", to: "./.htaccess", toType: 'file'}
        ]),
        new ImageminPlugin({
            test: /^(?!.*(header-bg|excursion-bg|taste__bg|main_logo|gift__bg|popup_main-\d|routes-4-info)).*\.(jpe?g|png|gif|svg|webp)$/i,
            optipng: {
                optimizationLevel: 6,
            },
            svgo: {
                plugins: [ {
                    removeViewBox: false
                }, {
                    convertStyleToAttrs: false
                }]
            },
            plugins: [
                imageminMozjpeg({
                    quality: 70,
                    progressive: true
                })
            ]
        }),
        new ImageminPlugin({
            test: /((header-bg|excursion-bg|taste__bg|main_logo|gift__bg|popup_main-\d|routes-4-info)\.(.*)\.(jpe?g|png|gif|svg|webp))/,
            optipng: {
                optimizationLevel: 6,
            },
            svgo: {
                plugins: [ {
                    removeViewBox: false
                }, {
                    convertStyleToAttrs: false
                }]
            },
            plugins: [
                imageminMozjpeg({
                    quality: 95,
                    progressive: true
                })
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|mp4|mp3|mpeg|svg|webp|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: paths.root.release.rel,
                            name: "[path][name].[hash].[ext]",
                            esModule: false
                        }
                    }]
            }
        ]
    }
});

module.exports = new Promise((resolve, reject) => {
   resolve(releaseWebpackConfig);
});
