const rateLimit = require('express-rate-limit')
const winston = require("winston");
require('../start/logging')
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window` per minute
    message:
        // { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
        { message: 'Too many login attempts from this IP.' },
    handler: (req, res, next, options) => {
        winston.error(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`)
        // res.status(options.statusCode).send(options.message)
        // console.log('options.message.message', options.message.message)
        res.status(options.statusCode).send(options.message.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = loginLimiter
