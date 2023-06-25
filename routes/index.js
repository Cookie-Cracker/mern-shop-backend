const router = require('express').Router()
require('dotenv').config()
const apiRoutes = require('./api')
const keys = require('../config/keys')


const api = `/${keys.app.apiURL}`

//API Routes
router.use(api, apiRoutes)
router.use(api, (req, res) => res.status(404).json('No API route found'))


module.exports = router