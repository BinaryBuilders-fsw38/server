const router    = require('express').Router()
const userRoutes = require('./userroutes')
const productRoutes = require('./productroutes')
const cartRoutes = require('./cartroutes')
const wishlistRoutes = require('./wishlistroutes')

router.use('/user', userRoutes )
router.use('/product', productRoutes )
router.use('/cart', cartRoutes)
router.use('/wishlist', wishlistRoutes)


module.exports = router
