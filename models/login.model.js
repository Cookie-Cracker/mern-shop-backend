const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose

const LoginSchema = new Schema(
    {
        userid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        logindate: {
            type: Date,
            default: Date.now
        }
    }
)
LoginSchema.plugin(mongoosePaginate)
const LoginHistory = mongoose.model('LoginHistory', LoginSchema)

module.exports = LoginHistory