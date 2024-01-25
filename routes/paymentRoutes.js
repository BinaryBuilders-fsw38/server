const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const payment = require("../controllers/paymentController");

router.post("/process-payment/:id", payment.processPayment);
router.get("/get/:id", payment.getCheckoutData);

module.exports = router;
