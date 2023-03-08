const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const { _jwt } = require('../config/keys')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            maxlength: 10,
        },
        logins: [
            { type: Date }
        ],

        //TODO: add active to users models
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    },
);


userSchema.methods.generateAccessToken = async function () {

    let authorities = []


    var thisuser = await this.populate('roles')


    for (let i = 0; i < thisuser.roles.length; i++) {

        authorities.push(thisuser.roles[i].name)
    }
    // console.log('authorities', authorities)

    const token = jwt.sign(
        {
            "UserInfo": {
                "id": this._id,
                "email": this.email,
                "roles": authorities
            }
        },

        // process.env.ACCESS_TOKEN_SECRET,
        _jwt.access_token_secret,
        // { expiresIn: '10m' }
        { expiresIn: _jwt.access_token_exp }
    )
    // console.log('generatedToken', token)
    return token
}
userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        {
            // _id: this._id,
            // username: this.username,
            email: this.email

        },

        // process.env.REFRESH_TOKEN_SECRET,
        _jwt.refresh_token_secret,
        // { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRATION) }
        // { expiresIn: '20m' }
        { expiresIn: _jwt.refresh_token_exp }

    )
    return token
}

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(3)
            .max(16)
            .required(),
        email: Joi.string(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
            .regex()
            .required(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),

        phone: Joi.string()
            .regex(/^\d{3}-\d{3}-\d{4}$/)
            .required(),

    })

    return Joi.validate(user, schema)
}

module.exports = User;
module.exports.validate = validateUser



