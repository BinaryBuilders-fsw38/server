const router    = require('express').Router()
global.query    = require('../model/query')
global.response = require('../response/response')
const user      = require('../controllers/userController')

router.post('/register', user.userRegister)
router.get('/login', user.userLogin)
router.put('/update/:id', user.userUpdate)

module.exports = router