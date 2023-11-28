const router    = require('express').Router()
const userRoutes = require('./userroutes')
const productRoutes = require('./productroutes')
const cartRoutes = require('./cartroutes')

router.use('/user', userRoutes )
router.use('/product', productRoutes )
router.use('/cart', cartRoutes)


module.exports = router
