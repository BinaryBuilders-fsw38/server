const query = require("../model/query");
const response = require("../response/response"); //bismillah fixings

let self = (module.exports = {
  getAllDataChekout: async function (req, res) {
    const getAllDataChekout = await query.selectAll("checkout");
    response.OK(res, {
      status: "success",
      message: "data berhasil diselect",
      data: getAllDataChekout, //fixing
    });
  },

  checkoutFromCart: async function (req, res) {
    try {
      const currentDate = new Date();
      const idCart = parseInt(req.params.id);
      const idUser = parseInt(req.body.idUser);
      const shipment = req.body.shipment;

      const cartItems = await query.selectColumns(
        "cart",
        { cart_id: idCart, user_id: idUser },
        ["product_id", "quantity"]
      );
      const productTotal = await self.calculateTotalPrice(cartItems);

      const shipment_price = self.getShipmentPrice(shipment);

      const total_price = productTotal + shipment_price;

      const checkout = {
        total_price,
        cart_id: idCart,
        user_id: idUser,
        created_at: currentDate,
        updated_at: currentDate,
        shipment_method: shipment,
      };

      await query.insert("checkout", checkout);
      response.CREATED(res, {
        status: `success`,
        message: `Checkout Berhasil ditambahkan`,
        data: checkout,
      });
    } catch (error) {
      console.error("Error saat membuat checkout:", error);
      response.ERROR(res, {
        status: `failed`,
        message: `Checkout Gagal`,
        data: [],
      });
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
    const cartId = parseInt(req.params.id);

    try {
      const getCheckout = await query.join(
        ["cart", "product", "user"],
        [
          ["cart.product_id", "product.product_id"],
          ["cart.user_id", "user.user_id"],
        ],
        { "cart.cart_id": cartId }
      );
      response.CREATED(res, {
        status: `success`,
        message: `Berikut adalah hasil checkoutnya`,
        data: getCheckout,
      });
    } catch (error) {
      console.error(`Gagal mengambil data checkout:`, error);
      response.NOTFOUND(res, {
        status: `failed`,
        message: `Data Not Found`,
        data: [],
      });
    }
  },
  deleteCheckout: async function (req, res) {
    const checkout_id = req.params.id;
    const getProduct = await query.select("checkout", {
      checkout_id: checkout_id,
    });
    if (getProduct.length > 0) {
      await query.delete("checkout", { checkout_id: checkout_id });
      response.OK(res, {
        status: "success",
        message: "product deleted",
        data: getProduct,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "product not found",
        data: [],
      });
    }
  },
  getCheckoutByUser: async function (req, res) {
    const userId = parseInt(req.params.id);

    try {
      const getCheckout = await query.join(
        ["cart", "product", "user", "checkout"],
        [
          ["cart.product_id", "product.product_id"],
          ["cart.user_id", "user.user_id"],
          ["cart.cart_id", "checkout.cart_id"],
        ],
        { "user.user_id": userId }
      );
      response.CREATED(res, {
        status: `success`,
        message: `Berikut adalah hasil checkoutnya`,
        data: getCheckout,
      });
    } catch (error) {
      console.error(`Gagal mengambil data checkout:`, error);
      response.NOTFOUND(res, {
        status: `failed`,
        message: `Data Not Found`,
        data: [],
      });
    }
  },
});
