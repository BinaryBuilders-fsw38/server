const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const checkout = require("../controllers/checkoutController");

router.post("/add/:id", checkout.checkoutFromCart);

module.exports = router;
