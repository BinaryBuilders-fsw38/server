const query = require("../model/query");
const response = require("../response/response");

let self = (module.exports = {
  processPayment: async function (req, res) {
    try {
      console.log("controller connected");
      const currentDate = new Date();
      const idUser = parseInt(req.params.id);
      const { checkout_id, payment_method } = req.body;

      const order = await query.select("checkout", {
        user_id: idUser,
        checkout_id: checkout_id,
      });

      console.log(order, `ini order`);

      if (!order) {
        response.NOTFOUND(res, {
          status: "not found",
          message: "order no found",
          data: [],
        });
      }

      const amount = order[0].total_price;

      const reference = self.generatePaymentReference(payment_method);

      if (!reference) {
        response.NOTFOUND(res, {
          status: "failed",
          message: "Invalid payment method",
          data: [],
        });
      }

      const paymentData = {
        payment_method: payment_method,
        payment_reference: reference,
        user_id: idUser,
        checkout_id: checkout_id,
        amount: amount,
        status: "Paid",
        created_at: currentDate,
        updated_at: currentDate,
      };

      await query.insert("payment", paymentData);
      res.json({ success: true, message: "payment berhasil" });

      const resi = self.generateTrackingNumber();

      const updateData = {
        shipment_status: "Dikirim",
        payment_status: "Paid",
        tracking_number: resi,
        updated_at: currentDate,
      };

      console.log(updateData, `testing data`);

      await query.update("checkout", updateData, { checkout_id: checkout_id });
    } catch (error) {
      console.error("Error processing payment:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to process payment" });
    }
  },

  generatePaymentReference: function (payment_method) {
    switch (payment_method.toLowerCase()) {
      case "va":
        return (
          "VA" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
        );
      case "gopay":
        return (
          "GP" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
        );
      default:
        return null;
    }
  },

  generateTrackingNumber: function () {
    // Logika untuk menghasilkan nomor pelacakan
    // Misalnya, kombinasi tanggal dan karakter acak
    const date = new Date().toISOString().replace(/[^0-9]/g, "");
    const randomDigits = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");
    return `${date}${randomDigits}`;
  },

  getCheckoutData: async function (req, res) {
    const cartId = parseInt(req.params.id);

    try {
      const getCheckout = await query.join(
        ["cart", "product", "user", "checkout"], // Hanya tabel cart, product, user, dan checkout
        [
          ["cart.product_id", "product.product_id"],
          ["cart.user_id", "user.user_id"],
          ["cart.cart_id", "checkout.cart_id"], // Asumsi bahwa cart_id pada cart cocok dengan cart_id pada checkout
        ],
        { "cart.cart_id": cartId }
      );
      response.CREATED(res, {
        status: `success`,
        message: `Berikut adalah hasil checkoutnya`,
        data: getCheckout,
      });
    } catch (error) {
      console.error(`Gagal mengambil data checkout:`, error); // fixing
      response.NOTFOUND(res, {
        status: `failed`,
        message: `Data Not Found`,
        data: [],
      });
    }
  },
});
