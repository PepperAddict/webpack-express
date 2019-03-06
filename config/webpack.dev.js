const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        main: [ //0,1 = hot reloading
            "webpack-hot-middleware/client?reload=true", "react-hot-loader/patch",
            "@babel/polyfill", "./src/main.js"] //can be an array to concat them together
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        
    },
    watchOptions: {
        poll: true
    },
    devServer: {
        publicPath: "/",
        overlay: false, //remove if you don't like the error overlay in the browser
        stats: {
            colors: true
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js|.jsx?$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        sourceType: "module"
                    }
                }],
                exclude: /node_modules/
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
                    { loader: "style-loader"},
                    { loader: "css-loader"},
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            title: "title test",
            template: "./src/index.hbs"  //change this to .html if we're using html
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
    ]
}