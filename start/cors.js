const cors = require('cors');
const winston = require("winston");


let allowedOrigins
if (process.env.NODE_ENV === 'production') {

    allowedOrigins = [
        'https://mern-shop-sbtp.onrender.com',
        // 'https://www.dandrepairshop.com',
        // 'https://dandrepairshop.com'
    ]
} else {
    allowedOrigins = [
        'http://localhost:3000',
        // 'https://www.dandrepairshop.com',
        // 'https://dandrepairshop.com'
    ]

}



const corsOptions = {
    origin: (origin, callback) => {
        winston.info(`CORS Origin: ${origin}`)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
module.exports = (app) => {
    app.use(cors(corsOptions))
}
