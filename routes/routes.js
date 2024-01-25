const router = require("express").Router();
const userRoutes = require("./userroutes");
const productRoutes = require("./productroutes");
const cartRoutes = require("./cartroutes");
const wishlistRoutes = require("./wishlistroutes");
const checkoutRouts = require("./checkoutRoutes");
const paymentRoutes = require("./paymentRoutes");
const articleRoutes = require("./articleRoutes");
const reviewProduct = require("./reviewProductRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/testing",  (req, res) => {
res.send("Kelompok 2")
})
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/checkout", checkoutRouts);
router.use("/payment", paymentRoutes);
router.use("/article", articleRoutes);
router.use("/review", reviewProduct);
router.use("/admin", adminRoutes);

module.exports = router;
