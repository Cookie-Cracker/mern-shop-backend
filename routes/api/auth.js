const express = require('express')
const verifySignup = require('../../middlewares/verifySignup')
const { verifyToken } = require('../../middlewares/authJwt')

const router = express.Router()
const authController = require('../../controllers/auth.controller')
const loginLimiter = require('../../middlewares/loginLimiter')

router.get('/', [verifyToken], authController.index)

router.post('/signup',
    [
        verifySignup.checkDuplicateUsernameOrEmail,
        verifySignup.checkRoleExists
    ],
    authController.signUp)

router.post('/signin', [loginLimiter], authController.signIn)
router.get('/refreshtoken', authController.refresh)
router.get('/roles', authController.roles)
router.post('/logout', authController.logout)
// router.post('/refreshtoken', authController.refreshToken)




module.exports = router