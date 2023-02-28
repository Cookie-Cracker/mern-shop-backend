
const winston = require('winston');
require('./start/logging')()
require('dotenv').config()
const mongoose = require('mongoose');
const Role = require("./models/role.model")
const Roles = require('./helpers/role')
const { database } = require('./config/keys')
const { ROLES } = require('./constants');
const setupMongoDb = require('./start/db');


async function seedRoles() {
    const roles = [
        ROLES.Admin,
        ROLES.Moderator,
        ROLES.User,

    ]
    mongoose.set("debug", true);
    mongoose.set("strictQuery", false);

    const db = `${database.url}${database.name}`

    await mongoose.connect(db)
        .then(() => {
            winston.info(`Connected to ${db}`)
            winston.info(`Seeding Roles...`)

        })
        .catch((error) => {
            winston.error(`DB timeout`, error)
            process.exit()
        })

    await Role.deleteMany({})

    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            roles.map(role => {
                new Role({ name: role })
                    .save((err, obj) => {
                        if (err) winston.error(err)
                    })


                winston.info(`Role: ${role} added.`)
            })
        }

        mongoose.disconnect()
        winston.info('Done !!!')
    })
}

async function seedDb() {
    const roles = [
        ROLES.Admin,
        ROLES.Moderator,
        ROLES.User,

    ]
    winston.info('Seed DB Started..')
    await Role.deleteMany({})

    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            roles.map(role => {
                new Role({ name: role })
                    .save((err, obj) => {
                        if (err) winston.error(err)
                    })


                winston.info(`Role: ${role} added.`)
            })
        }

        // mongoose.disconnect()
        // winston.info('Done !!!')
    })
}

// (async() =>{
//     await setupMongoDb().then(async () =>{
//         seedDb()
//     })
// })()



// seedRoles();