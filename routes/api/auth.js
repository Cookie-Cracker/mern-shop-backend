const express = require('express')
const verifySignup = require('../../middlewares/verifySignup')
const { verifyToken } = require('../../middlewares/authJwt')

const router = express.Router()
const authController = require('../../controllers/auth.controller')
const loginhistoryController = require('../../controllers/loginhistory.controller')
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
router.get('/loginhistory', loginhistoryController.loginHistory)
router.get('/loginstop5', loginhistoryController.loginsTopFiveByUser)
router.get('/loginsall', loginhistoryController.loginsTopFiveByUser)
router.post('/logout', authController.logout)
// router.post('/refreshtoken', authController.refreshToken)




module.exports = router