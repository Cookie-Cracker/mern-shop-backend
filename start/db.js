const winston = require('winston')
const mongoose = require('mongoose')
const keys = require('../config/keys')

const { database } = keys
const setupMongoDb = async () => {
    // mongoose.set("debug", true);
    // mongoose.set("strictQuery", false);
    try {

        const db = process.env.NODE_ENV === 'production'
            ? database.mongo_atlas
            : database.url

        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
            .then(() => winston.info(`Connnected to ${db}`))

    } catch (err) {
        winston.error(`From Connect`, err)

    }
    // .then(() => winston.info(`Connnected to ${db}`))
    // .catch((error) => {
    //     winston.error(`DB timeout`, error)
    //     process.exit()
    // })


    // seedRoles()
}

module.exports = setupMongoDb