const User = require('../models/user.model')
const Role = require('../models/role.model')

const bcrypt = require('bcrypt')
const _ = require('loadsh')


const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password').populate('roles').lean()

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

const addNewUser = async (req, res) => {
    const { username, email, password, phone, roles } = req.body
    console.log('req.body', req.body)

    if (!username || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" })
    }

    let duplicate = await User.findOne({ email }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicated email' })
    }

    let user = new User(_.pick(req.body, ['username', 'email', 'password', 'phone']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.save((err, user) => {
        if (err) {
            res.status(500).json({ message: '"Wrong1"', })
            console.log('err', err)
            return;
        }
        const reqRoles = req.body.roles
        if (reqRoles) {
            Role.find(
                {
                    name: { $in: reqRoles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).json({ message: "Something went wrong. Role not valid." })
                        return;
                    }

                    user.roles = roles.map((role) => role._id)
                    user.save((err) => {
                        if (err) {
                            res.status(500).json(errorFunction(true, "Someting went wrong", err))
                            return;
                        }

                        res.status(201).json({ message: "User was registered successfully!" });
                    });
                }


            )
        }
    })
    // if (user) { //created 
    //     res.status(201).json({ message: `New user ${username} created` })
    // } else {
    //     res.status(400).json({ message: 'Invalid user data received' })
    // }
}
const getMe = async (req, res) => {
    const { id } = req.params
    if (!id) if (!id) return res.status(400).json({ message: 'User ID Required.' })
    const user = await User.findById(id).populate('roles').select('-__v').exec()
    if (!user) return res.status(400).json({ message: 'User Not Found' })
    res.json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.body
    console.log('id', id)

    if (!id) return res.status(400).json({ message: 'User ID Required.' })

    const user = await User.findById(id).exec()
    if (!user) return res.status(400).json({ message: 'User Not Found' })
    const result = await User.findOneAndDelete({ _id: id }).exec()
    console.log('result', result)

    console.log(`Username ${result.username} with ID: ${result._id} deleted.`)
    const message = `Username ${result.username} with ID: ${result._id} deleted.`
    res.status(200).json({ message })
}

module.exports = {
    getAllUsers,
    addNewUser,
    getMe,
    deleteUser
}