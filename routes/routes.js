const router    = require('express').Router()
const userRoutes = require('./userroutes')
const productRoutes = require('./productroutes')

router.use('/user', userRoutes )
router.use('/product', productRoutes )


module.exports = router
