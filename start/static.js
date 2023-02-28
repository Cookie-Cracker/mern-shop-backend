const express = require('express');
const path = require('path')
module.exports = (app) => {
    app.use('/uploads', express.static('uploads'))
    app.use('/', express.static('public'))



}