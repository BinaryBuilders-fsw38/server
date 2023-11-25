const router    = require('express').Router()
const userRoutes = require('./userroutes')

router.use('/user', userRoutes )


module.exports = router
