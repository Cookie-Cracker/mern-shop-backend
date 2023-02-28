const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Role = require('../models/role.model')
const errorFunction = require('../utils/errorFunction')
const keys = require('../config/keys')
// require('dotenv').config()

const { jwtkey } = keys

const { TokenExpiredError } = jwt

//TODO: chech error catch
const catchError = (err, res) => {


    if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: 'Unauthorized! Access Token was expired!' });
    }
    console.log('err', err.message)
    return res.sendStatus(401).json({ message: 'Unauthorized' })
}
const verifyToken = (req, res, next) => {
    //Format Bearer {token}
    // const token = req.headers.Authorization ? req.headers.Authorization.split(' ')[1] : null
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]

    console.log('authHeader', authHeader)
    console.log('token', token)

    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        req.user = decoded
        next()
    })
}


// const authorize = (role) => {
//     return (req, res, next) => {
//         User.findById(req.user._id).exec((err, user) => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }

//             Role.find(
//               {
//                 _id: { $in: user.roles }
//               },
//               (err, roles) => {
//                 if (err) {
//                   res.status(500).send({ message: err });
//                   return;
//                 }

//                 for (let i = 0; i < roles.length; i++) {
//                   if (roles[i].name ===  role[0]) {
//                     next();
//                     return;
//                   }
//                 }

//                 res.status(403).send({ message: `Require ${role.toUpperCase()} Role!` });
//                 return;
//               }
//             );
//           })
//     }
// }
const authorize = (proles = []) => {
    return (req, res, next) => {
        // roles param can be a single role string (e.g. Role.User or 'User') 
        // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
        if (typeof proles === 'string') {
            proles = [proles];
        }
        User.findById(req.user._id).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            Role.find(
                {
                    _id: { $in: user.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    for (let i = 0; i < roles.length; i++) {
                        if (proles.includes(roles[i].name)) {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({ message: `Require ${proles} Role!` });
                    return;
                }
            );
        })
    }
}


const isAdmin = (req, res, next) => {
    User.findById(req.user._id).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};
const isModerator = (req, res, next) => {

}

const authJwt = {
    verifyToken,
    authorize,
    isAdmin,
    isModerator
}

module.exports = authJwt