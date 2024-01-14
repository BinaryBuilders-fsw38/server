const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const admin = require("../controllers/adminController");

router.post("/login", admin.adminLogin); //ok
router.delete("/delete/:id", admin.adminDelete); //ok

module.exports = router;
