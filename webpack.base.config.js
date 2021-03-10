/* --------------- modules & plugins --------------------------- */

const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

/* --------------- const ------------------------------------- */

let paths = {
    src: {
        abs: path.resolve(__dirname, "src"),
        rel: "src"
    },
    dist: {
        debug: {
            abs: path.resolve(__dirname, "dist/debug"),
            rel: "dist/debug"
        },
        release: {
            abs: path.resolve(__dirname, "dist/release"),
            rel: "dist/release"
        }
    },
    root: {
        debug: {
            abs: __dirname,
            rel: "/projects/17-Рязань/3.production/",
            host: "https://localhost:4430"
        },
        release: {
            abs: __dirname,
            rel: "/"
            //rel: "/ryazan/"
        }
    },
    folders: {
        js: "js/",
        style: "style/",
        img: "img/"
    }
};

const isDev = process.env.NODE_ENV === "development";
const distPath = isDev ? paths.dist.debug.abs : paths.dist.release.abs;

/* --------------- functions --------------------------------- */

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
                publicPath: (resourcePath, context) => {
                    return path.relative(path.dirname(resourcePath), context) + '/';
                }
            }
        },
        "css-loader"
    ];

    let postcss = {
        loader: "postcss-loader",
        options: {
            ident: "postcss",
            plugins: [
                require("postcss-object-fit-images")
            ]
        }
    }
    // add Autoprefixer if Dev
    if (!isDev) {
        postcss.options.plugins.push(
            require("autoprefixer")({ grid: "autoplace" })
        );
    }
    loaders.push(postcss);

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
}

function generateHtmlPlugins(templateDirs) {
    let plugins = [];
    if (templateDirs === "" || templateDirs === []) return [];
    if (!Array.isArray(templateDirs)) templateDirs = [templateDirs];

    templateDirs.forEach(templateDir => {
        let templateFiles;
        try {
            templateFiles = fs.readdirSync(path.resolve(__dirname, "src", templateDir));
        } catch (e) {
            if (e.errno === -4058) return []; // directory not found
        }

        // filter needed extensions
        templateFiles = templateFiles.filter((item) => {
            const parts = item.split('.');
            const extension = parts[1];
            return ["php", "html", "htm"].includes(extension);
        });

        plugins = templateFiles.map(item => {
            const parts = item.split('.');
            const name = parts[0];
            const extension = parts[1];
            return new HTMLWebpackPlugin({
                filename: path.join(templateDir, `${name}.${extension}`),
                template: path.join(templateDir, `${name}.${extension}`),
                chunks: ["sections", name],
                collapseWhiteSpace: !isDev, // minify HTML in production
                ignoreCustomComments: isDev ? [] : [/^!/]
            })
        }).concat(plugins);
    });
    return plugins;
}

const plugins = () => {
    let base = [
        new CopyWebpackPlugin([
            { from: "./img/gift/border.png", to: "./img/gift/border.png"},
            { from: "./img/popup_main-1.jpg", to: "./img/popup_main-1.jpg"},
            { from: "./img/popup_main-2.jpg", to: "./img/popup_main-2.jpg"},
            { from: "./img/routes-4-info.jpg", to: "./img/routes-4-info.jpg"}
            //{ from: "./video/video.jpg", to: "./video/video.jpg"}
        ]),
        new MiniCssExtractPlugin({
            filename: paths.folders.style  + fileName("css"),
            path: distPath
        })
    ];

    base = base.concat(
        generateHtmlPlugins([""])
    );

    return base;
}

/* ---------------- module.exports ------------------------ */

module.exports = {
    context: paths.src.abs,
    externals: {
        paths: paths
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@js": path.resolve(__dirname, "src/js"),
            "@img": path.resolve(__dirname, "src/img"),
            "@style": path.resolve(__dirname, "src/style")
        }
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    output: {
        filename: paths.folders.js + fileName("js")
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.(s[ac]ss)$/i,
                use: cssLoaders("sass-loader")
            },
            {
                test: /\.(html?|php)$/i,
                use: [{
                    loader: "html-loader",
                    options: {
                        attributes: {
                            root: ".",
                            list: [{
                                attribute: "src",
                                type: "src",
                            }, {
                                attribute: "data-src",
                                type: "src",
                            }, {
                                attribute: "srcset",
                                type: "srcset",
                            }, {
                                tag: "link",
                                attribute: "href",
                                type: "src",
                            }, {
                                attribute: 'data',
                                type: 'src',
                            }, {
                                attribute: 'poster',
                                type: 'src',
                            }],
                            urlFilter: (attribute, value, resourcePath) => {
                                if (/img\/gift\/(.*)\.jpg$/.test(value)) {
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                }]
            }
        ]
    }
};
