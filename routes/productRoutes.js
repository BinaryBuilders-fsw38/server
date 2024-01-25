const router = require("express").Router();
global.query = require("../model/query");
global.response = require("../response/response");
require("dotenv").config();
const product = require("../controllers/productController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "PRODUCT",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("product_file"), product.uploadProduct);
router.put("/update/:id", upload.single("product_file"), product.updateProduct);
router.get("/get/:brand", product.readProduct);
router.get("/get", product.readProductAll);
router.get("/getBrands", product.readBrands);
router.delete("/delete/:id", product.deleteProduct);
router.get("/suggest/:id", product.suggestProduct);
router.get("/get-product/:id", product.readProductId);

module.exports = router;
