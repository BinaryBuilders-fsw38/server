const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const reviewProduct = require("../controllers/reviewProductController");

router.post("/add/:id", reviewProduct.addReview);
router.get("/get/:id", reviewProduct.readReview);
router.get("/getAverage/:id", reviewProduct.averageScore);
router.put("/put/:id", reviewProduct.updateReview);
router.delete("/delete/:id", reviewProduct.deleteReview);

module.exports = router;
