const express = require('express')
const errorFunction = require('../../utils/errorFunction')

const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).json(
       errorFunction(false, 'Home Page', 'Welcome to MERN - Restaurant')
    )
})

module.exports = router