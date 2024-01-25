const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const admin = require("../controllers/adminController");
const order = require("../controllers/orderAdminController");

router.post("/login", admin.adminLogin); //ok
router.delete("/delete/:id", admin.adminDelete); //ok

router.patch("/order/update", order.orderAdmin);

module.exports = router; //fixing
