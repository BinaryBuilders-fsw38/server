const router    = require('express').Router()
const userRoutes = require('./userroutes')
const productRoutes = require('./productroutes')
const cartRoutes = require('./cartroutes')
const wishlistRoutes = require('./wishlistroutes')
const checkoutRouts = require('./checkoutRoutes')
const paymentRoutes = require('./paymentRoutes')

router.use('/user', userRoutes )
router.use('/product', productRoutes )
router.use('/cart', cartRoutes)
router.use('/wishlist', wishlistRoutes)
router.use('/checkout', checkoutRouts)
router.use('/payment', paymentRoutes)

module.exports = router
