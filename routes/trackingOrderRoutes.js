const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const trackingOrder = require("../controllers/trackingOrderController");

router.post("/update-order-status", trackingOrder.updateOrderStatus);

module.exports = router; // fixing
