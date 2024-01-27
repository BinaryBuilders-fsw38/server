const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const productRoutes = require("./productRoutes.js");
const cartRoutes = require("./cartRoutes.js"); //fixing
const wishlistRoutes = require("./wishlistRoutes.js");
const checkoutRouts = require("./checkoutRoutes.js");
const paymentRoutes = require("./paymentRoutes.js");
const articleRoutes = require("./articleRoutes.js");
const reviewProduct = require("./reviewProductRoutes.js");
const adminRoutes = require("./adminRoutes.js");

router.use("/testing", (req, res) => {
  res.send("Kelompok 8");
});
router.use("/user", userRoutes);
router.use("/product", productRoutes); // fix
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/checkout", checkoutRouts);
router.use("/payment", paymentRoutes);
router.use("/article", articleRoutes);
router.use("/review", reviewProduct);
router.use("/admin", adminRoutes);

module.exports = router;
