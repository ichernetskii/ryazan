/* --------------- modules & plugins --------------------------- */

const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config.js");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin');

/* --------------- const ------------------------------------- */

let paths = baseWebpackConfig.externals.paths;

/* --------------- functions --------------------------------- */


/* --------------- module.exports ---------------------------- */

const debugWebpackConfig = merge.smart(baseWebpackConfig, {
    mode: "development",
    cache: false,
    devtool: "source-map",
    entry: {
        index: ["./js/index.js"]
    },
    output: {
        path: paths.dist.debug.abs,
        publicPath: paths.root.debug.rel + paths.dist.debug.rel + "/"
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false, // очищать неиспользуемое при ребилде?
        }),
        new CopyWebpackPlugin([
            { from: "./.htaccess.debug", to: "./.htaccess", toType: "file"}
        ]),
        new StylelintPlugin(),
        new BrowserSyncPlugin({
            port: 3000,
            proxy: paths.root.debug.host + paths.root.debug.rel + paths.dist.debug.rel,
            browser: ["firefox"]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "eslint-loader"
                }]
            },
            {
                test: /\.(png|jpe?g|gif|mp4|mp3|mpeg|svg|webp|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        publicPath: paths.root.debug.rel + paths.dist.debug.rel,
                        name: "[path][name].[ext]"
                    }
                }]
            }
        ]
    }
});

module.exports = new Promise((resolve, reject) => {
    resolve(debugWebpackConfig);
});
