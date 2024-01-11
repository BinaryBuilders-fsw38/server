const query = require("../model/query");
const response = require("../response/response");

let self = (module.exports = {
  checkoutFromCart: async function (req, res) {
    try {
      console.log("controller connected");
      const currentDate = new Date();
      const idUser = parseInt(req.params.id);
      const idCart = parseInt(req.body.idCart);
      const shipment = req.body.shipment;

      const cartItems = await query.selectColumns(
        "cart",
        { user_id: idUser, cart_id: idCart },
        ["product_id", "quantity"]
      );
      const productTotal = await self.calculateTotalPrice(cartItems);

      const shipment_price = self.getShipmentPrice(shipment);

      const total_price = productTotal + shipment_price;

      const checkout = {
        total_price,
        user_id: idUser,
        cart_id: idCart,
        created_at: currentDate,
        updated_at: currentDate,
        shipment_method: shipment,
      };

      await query.insert("checkout", checkout);
      res.json({ success: true, message: `checkout berhasil` });
    } catch (error) {
      console.error("Error saat membuat checkout:", error);
      res.status(500).json({ error: "Failed to create checkout" });
    }
  },

  calculateTotalPrice: async function (cartItems) {
    const cartItemsArray = cartItems;
    const prices = await Promise.all(
      cartItemsArray.map(async (item) => {
        const product = await query.selectColumns(
          "product",
          { product_id: item.product_id },
          ["price"]
        );
  
        return product[0].price * item.quantity;
      })
    );
  
    return prices.reduce((total, price) => total + price, 0);
  },
  
  getShipmentPrice: function (shipment_method) {
    const standardPrice = 10000;
    const expressPrice = 20000;

    switch (shipment_method) {
      case "standard":
        return standardPrice;
      case "express":
        return expressPrice;
      default:
        return 0; // Default untuk metode pengiriman tidak valid atau tidak disertakan
    }
  },
  getCheckoutData: async function (req, res) {
    const userId = parseInt(req.params.id);
  
    try {
      const getCheckout = await query.joinThreeTables(
        'checkout',
        'cart',
        'product',
        'cart_id',
        'cart_id',
        'product_id',
        { 'checkout.user_id': userId }
      );
  
      res.json(getCheckout);
    } catch (error) {
      console.error(`Gagal mengambil data checkout:`, error);
      res.status(500).json({ error: "Failed to get checkout data" });
    }
  },
});
