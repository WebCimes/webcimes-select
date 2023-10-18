import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import FileManagerPlugin from "filemanager-webpack-plugin";
// const isProduction = process.env.NODE_ENV == "production";

// Config UDM
const configUDM: webpack.Configuration = {
    mode: "production",
    devtool: "source-map",
    entry: {
        "webcimes-select.udm": "./src/ts/webcimes-select.ts",
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        clean: false, // Clean the output directory before emit.
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js$/i,
                extractComments: false,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                use: "ts-loader",
            },
        ],
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./dist/js",
                    ],
                },
                onEnd: {
                    copy: [
                        { source: "./src/ts/webcimes-select.d.ts", destination: './dist/js/webcimes-select.udm.d.ts' },
                    ],

                },
            },
        }),
    ],
};

// Config ESM
const configESM: webpack.Configuration = {
    mode: "production",
    devtool: "source-map",
    entry: {
        "webcimes-select.esm": "./src/ts/webcimes-select.ts",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js$/i,
                extractComments: false,
            }),
        ],
    },
    experiments: {
        outputModule: true,
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "module",
        clean: false, // Clean the output directory before emit.
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                use: "ts-loader",
            },
        ],
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./dist/js",
                    ],
                },
                onEnd: {
                    copy: [
                        { source: "./src/ts/webcimes-select.d.ts", destination: './dist/js/webcimes-select.esm.d.ts' },
                    ],

                },
            },
        }),
    ],
};

// Config CSS + Remove plugin
const configCSS: webpack.Configuration = {
    mode: "production",
    devtool: "source-map",
    entry: {
        "webcimes-select": "./src/css/webcimes-select.css",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                test: /\.css$/i,
            }),
        ],
    },
    output: {
        filename: "css/[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: false, // Clean the output directory before emit.
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                // use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]', // Correct bug asset/ressource url wrong path with css files subfolder https://github.com/webpack-contrib/mini-css-extract-plugin/issues/1005
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "css/[name].css"}),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./dist/css",
                    ],
                },
                onEnd: {
                    delete: [
                        "./dist/css/webcimes-select.js",
                        "./dist/css/webcimes-select.js.map",
                    ],
                }
            },
        }),
    ],
};

// Export
export default [configUDM, configESM, configCSS];