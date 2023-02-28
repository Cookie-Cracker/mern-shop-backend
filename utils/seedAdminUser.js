
const winston = require('winston');
const bcrypt = require('bcrypt');
require('../start/logging')()
require('dotenv').config()
const mongoose = require('mongoose');
const Role = require("../models/role.model")
const User = require("../models/user.model")
const Roles = require('../helpers/role')
const { database } = require('../config/keys')
const { ROLES } = require('../constants');
const setupMongoDb = require('../start/db');

const args = process.argv.slice(2)
console.log('args', args)
const email = args[0]
const password = args[1]

async function seedAdmiUser() {
try {
    // const roles = [
    //     ROLES.Admin,
    //     ROLES.Moderator,
    //     ROLES.User,

    // ]

    if(!email || !password) throw new Error('Missing arguments.')
    // user = new User(_.pick(req.body, ['username', 'email', 'password', 'phone']))
    let user = await User.findOne({email: email})
    if(user) throw new Error('Admin is already in place')
    
    
    user = new User({
        username: 'admin',
        email: email,
        password: password,
        phone: '7865546040',
        roles:[ '63d53c5e1cae94e5ed93de6d']
    })

    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.save((err, user) => {
        if (err) {
          throw new Error(`Something went wrong while saving the  user. ${err}` )
        }

        console.log('user added: ', user)
       
    })

} catch (error) {
    console.log('Admin User seed error: ', error)
}


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

(async() =>{
    await setupMongoDb().then(async () =>{
        seedAdmiUser()
    })
})()



// seedRoles();