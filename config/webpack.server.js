const path = require("path")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")

module.exports = env => {
    console.log('NODE_ENV ', env);
    return {
        entry: {
        server: ["./src/server/main.js"] //can be an array to concat them together
    },
    mode: "production",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../build"),
        
    },
    target: "node",
    externals: nodeExternals(),
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
                            name: "images/[name].[ext]",
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        
    ]
    }
    
}