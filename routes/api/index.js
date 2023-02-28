const router = require('express').Router();

const defaultRoutes = require('./default')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const brandRoutes = require('./brand')
const categoryRoutes = require('./category')
const productRoutes = require('./product')

// TODO: role base auth missing yet

router.use('/', defaultRoutes)
router.use('/auth', authRoutes)
// router.use('/testaccess', userRoutes)
router.use('/user', userRoutes)


router.use('/brand', brandRoutes)
router.use('/category', categoryRoutes)
router.use('/product', productRoutes)



module.exports = router;