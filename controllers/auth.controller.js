const bcrypt = require('bcrypt')
const _ = require('loadsh')
const jwt = require('jsonwebtoken')

const errorFunction = require('../utils/errorFunction')

const User = require('../models/user.model')
const Role = require('../models/role.model')
const RefreshToken = require('../models/refreshToken.model')
const { json } = require('express')
const LoginHistory = require('../models/login.model')


//TODO:asyncHandler

const index = async (req, res, next) => {

    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)

}

const signUp = async (req, res, next) => {

    user = new User(_.pick(req.body, ['username', 'email', 'password', 'phone']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.save((err, user) => {
        if (err) {
            res.status(500).json(errorFunction(true, "Someting went wrong1", err))
            return;
        }
        const reqRoles = req.body.roles
        // console.log('reqRoles', reqRoles)
        if (reqRoles) {
            Role.find(
                {
                    name: { $in: reqRoles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).json(errorFunction(true, "Something went wrong. Role not valid.", err))
                        return;
                    }

                    user.roles = roles.map((role) => role._id)
                    user.save((err) => {
                        if (err) {
                            res.status(500).json(errorFunction(true, "Someting went wrong", err))
                            return;
                        }

                        res.send({ message: "User was registered successfully!" });
                    });
                }


            )
        }
    })





}

const signIn = async (req, res, next) => {


    const { email, password } = req.body
    if (!email || !password) return res.status(400).send('Username and password are required.')

    let user = await User.findOne({ email: email }).populate('roles', '-__v').exec()
    // console.log('user login', user)

    if (!user) return res.status(401).send('Unauthorized')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).send('Unauthorized')

    user.logins.push(new Date())
    const loginH = new LoginHistory({ userid: user._id })
    loginH.save()
    await user.save()

    const accessToken = await user.generateAccessToken()


    let refresh_token = await RefreshToken.createToken(user)

    res.cookie('jwt', refresh_token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // let authorities = []
    // console.log('user.roles', user.roles)
    // for (let i = 0; i < user.roles.length; i++) {
    //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase())

    // }
    // console.log('authoritiesssssss', authorities)


    // res.status(200).json(
    //     {
    //         id: user._id,
    //         username: user.username,
    //         email: user.email,
    //         roles: authorities,
    //         accessToken: access_token,
    //         refreshToken: refresh_token
    //     }
    // )
    res.json({ accessToken })


}



const refresh = async (req, res) => {
    const cookies = req.cookies
    // console.log('cookies', req.cookies)

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized Cookie' })

    const cookie_token = cookies.jwt

    try {
        let refreshToken = await RefreshToken.findOne({ token: cookie_token })
        if (!refreshToken) return res.status(403).json({ message: 'Forbidden1.' })

        if (RefreshToken.verifyExpiration(refreshToken)) {
            // console.log('will errase')
            await RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
            return res.status(403).json({ message: 'Refresh token expired1.' })

        }

        let user = await User.findById(refreshToken.user._id)
        let accessToken = await user.generateAccessToken()
        // console.log('refreshhAcccesssss', accessToken)
        res.json({ accessToken })
        // res.send('wath')

    } catch (error) {
        // console.log('error', error)
        res.status(500).json(
            { message: 'Something weird here' }
        )
    }
}

const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        // console.log('no Cookie')
        return res.sendStatus(240)
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    // console.log('Logouttttttttttttttttttttttttttttttt')
    res.json({ message: 'Cookie cleared' })
    // res.status(400).json({ message: "Error Loggin Out" })
}
const roles = async (req, res) => {
    var roles = await Role.find().select('-__v').lean()
    if (!roles?.length) {
        return res.status(400).json({ message: 'No roles found' })
    }

    res.json(roles)
}

module.exports = {
    index,
    signUp,
    signIn,
    // refreshToken,
    refresh,
    logout,
    roles
}