const express = require('express');

const defaultRoute = require('../routes/default')
const auth = require('../routes/auth');
const user = require('../routes/user');

module.exports = (app) => {
    app.use(express.json())
    app.use('/', defaultRoute)
    app.use('/api/user', user)
    app.use('/api/auth', auth)
}