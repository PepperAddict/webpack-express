const express = require('express')
const path = require('path')
const server = express()

const staticMiddleware = express.static('dist')

server.use(staticMiddleware)

server.listen(8080, () => {
    console.log('The server is listening in port 8080')
})