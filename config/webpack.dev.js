const path = require("path")

module.exports = {
    entry: {
        main: ["@babel/polyfill", "./src/main.js"] //can be an array to concat them together
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        port: 8888,
        overlay: true //remove if you don't like the error overlay
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
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
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    { 
                        loader: "file-loader",
                        options: {
                            name: "[name].html"
                        }
                    },
                    { // make a separate file
                        loader: "extract-loader"
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]

                        }
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
    }
}