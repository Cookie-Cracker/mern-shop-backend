const express = require('express')
const router = express.Router()
const authJwt = require('../../middlewares/authJwt')


// const userController = require('../../controllers/user.controller')
const usersController = require('../../controllers/users.controller')
const Role = require('../../helpers/role')

// router.get('/all', userController.allAccess)

// router.get('/user',
//     [
//         authJwt.verifyToken
//     ],
//     userController.userBoard)

// router.get('/admin',
//     [
//         authJwt.verifyToken, authJwt.authorize([Role.Admin])
//     ],
//     userController.adminBoard)

// router.get('/mod',
//     [
//         authJwt.verifyToken,
//         authJwt.authorize([Role.Moderator])
//     ],
//     userController.moderatorBoard)

// router.use(authJwt.verifyToken)
router
    .get('/', usersController.getAllUsers)
    .get('/:id', usersController.getMe)
    .post('/', usersController.addNewUser)
    .delete('/', usersController.deleteUser)


module.exports = router