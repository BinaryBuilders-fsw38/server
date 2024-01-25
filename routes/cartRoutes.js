const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const cart = require("../controllers/cartController");

router.post("/add/:id", cart.addCart);
router.delete("/del/:id", cart.deleteCartByID);
router.get("/view/:id", cart.getCartData);

module.exports = router; // fixing
