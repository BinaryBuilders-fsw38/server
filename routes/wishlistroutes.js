const router    = require('express').Router()
global.query    = require('../model/query')
global.response = require('../response/response')
const wishlist  = require('../controllers/wishlistController')

router.post('/add/:id', wishlist.addWishlist)
router.delete('/delete/:id', wishlist.deleteWishlist)
router.get('/get/:id', wishlist.getWishlist)

module.exports = router