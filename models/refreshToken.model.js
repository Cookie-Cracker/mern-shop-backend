const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { _jwt } = require('../config/keys')

function millisecondsToMinAndSec(millisec) {

    let min = (millisec / 1000) / 60
    let sec = (millisec / 1000) % 60
    if (min <= 0) {
        console.log(`RefToken Lifetime Expired`)

    } else {

        console.log(`RefToken Lifetime Left: \n Millisec: ${millisec} \n Min: ${min} \n Sec: ${sec}`)
    }
}

const refreshTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expiryDate: Date
})

refreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date()


    expiredAt.setSeconds(
        expiredAt.getSeconds() + parseInt(_jwt.refresh_token_exp_in_seconds)
    )


    // let _token = process.env.REFRESH_TOKEN_SECRET;
    let _token = jwt.sign(
        { user },
        // process.env.REFRESH_TOKEN_SECRET,
        _jwt.refresh_token_secret,
        // { expiresIn: '10m' }
        { expiresIn: _jwt.access_token_exp }
    )
    let _object = new this({
        token: _token,
        user: user._id,
        expiryDate: expiredAt.getTime()
    })

    console.log('_object', _object)

    let refreshToken = await _object.save()

    return refreshToken.token;
}

refreshTokenSchema.statics.verifyExpiration = (token) => {

    millisecondsToMinAndSec(token.expiryDate.getTime() - new Date().getTime())
    return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)
module.exports = RefreshToken
