const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
const article = require("../controllers/articleController");

router.post("/add/:id", article.addArticle);
router.put("/update/:id", article.updateArticle);
router.get("/get/:id", article.readArticle);
router.delete("/delete/:id", article.deleteArticle);

module.exports = router;
