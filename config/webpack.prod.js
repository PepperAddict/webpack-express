const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

module.exports =  {
        entry: {
        main: ["@babel/polyfill", "./src/main.js"] //can be an array to concat them together
    },
    mode: "production",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        
    },
    watchOptions: {
        poll: true
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [ //reverse order
                    { // inject css into the html
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    },
                    { 
                        loader: "postcss-loader",
                        options: {
                            indent: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    'browsers': ['> 1%', 'last 2 versions']
                                })
                            ]
                        }
                }
                ]
            },
            {
                test: /\.styl$/,
                use: [ 
                    { loader: MiniCSSExtractPlugin.loader},
                    { 
                        loader: "css-loader"
                    },
                    { 
                        loader: "postcss-loader",
                        options: {
                            indent: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    'browsers': ['> 1%', 'last 2 versions']
                                })
                            ]
                        }
                    },
                    { loader: "stylus-loader"}
                ]
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: "html-loader"
                }]
            },
            {
                test: /\.hbs|.handlebars$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "handlebars-loader",
                        query: {
                            inlineRequires: "/images/"
                        },
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer:  [
            new UglifyPlugin({
            test: /\.js(\?.*)?$/i,
            sourceMap: true, 
        }),
            new CompressionPlugin({
                algorithm: "gzip"
            }),
            new OptimizeCSSAssetsPlugin(),
            new MiniCSSExtractPlugin({
                filename: "[name]-[contenthash].css",
                chunkFilename: "[id].css"
            }),
        ] 
    },
    plugins: [

        new HTMLWebpackPlugin({
            title: "title test",
            inject: true,
            template: "./src/index.hbs"  //change this to .html if we're using html
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:'"production"'
            }
        }),
        new BrotliPlugin()
        
    ]
}