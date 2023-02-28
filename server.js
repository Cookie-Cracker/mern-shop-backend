const app = require('./app')
const setupDb = require('./start/db')

const winston = require("winston");
require('./start/logging')()
const http = require('http');
const keys = require('./config/keys');
const mongoose = require('mongoose')


const { port } = keys
const server = http.createServer(app)

setupDb()
console.log('Loading..')
winston.warn(`Environment: ${process.env.NODE_ENV}`)


mongoose.connection.once('open', () => {

    server.listen(port, () => {
        winston.info(`Listening on PORT ${port}. Visit http://localhost:${port}/ in your browser.`)
    })
})
mongoose.connection.on('error', err => {
    // winston.error(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`)
    console.log('err', err.no)
    process.exit()
})


module.exports = server