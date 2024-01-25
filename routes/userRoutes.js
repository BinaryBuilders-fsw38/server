const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const user = require("../controllers/userController");

router.get("/get", user.getUserAll);
router.get("/get/:id", user.getSingleUser);
router.post("/register", user.userRegister);
router.post("/login", user.userLogin);
router.patch("/update/:id", user.userUpdate);
router.patch("/update/auth/:id", user.userUpdateAuth);
router.delete("/delete/:id", user.userDelete);

module.exports = router; // fixing
