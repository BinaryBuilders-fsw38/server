const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const checkout = require("../controllers/checkoutController");
const {authenticate} = require("../lib/passport")

router.post("/add/:id", checkout.checkoutFromCart);
router.get("/get/:id", authenticate, checkout.getCheckoutData);
router.delete("/delete/:id", checkout.deleteCheckout);
module.exports = router;
