const express = require('express')
const path = require('path')
const server = express()
const webpack = require("webpack")
const config = require("../../config/webpack.dev.js")
const compiler = webpack(config)

//make it recompile when there are changes
const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
)

// telling it to look in the dist folder
const staticMiddleware = express.static('dist')

//live reloading 
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)
server.use(staticMiddleware)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`The server is listening in http://localhost:${PORT} in ${process.env.NODE_ENV}`)
})