require('dotenv').config()
const winston = require("winston");
const express = require('express');
const setupDb = require('./start/db')
const routes = require('./routes')
const path = require('path')
require("express-async-errors");
const cookieParser = require('cookie-parser')

//TODO: Include helmet / compression
// const compression = require('compression');
// const helmet = require('helmet');

const app = express()
require('./start/static')(app)
require('./start/cors')(app)
app.use(express.json())
const { urlencoded } = require('express')
app.use(urlencoded())
app.use(cookieParser())


app.use('/', require('./routes/root'))
app.use(routes)

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });


// require('./start/routes')(app)
require('./start/swagger')(app)
// setupDb()
require('./routes/errorFallback')(app)


module.exports = app
