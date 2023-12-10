const query = require("../model/query");
// const response = require("../response/response");

let self = (module.exports = {
  processPayment: async function (req, res) {
    try {
      console.log("controller connected");
      const currentDate = new Date();
      const idUser = parseInt(req.params.id);
      const { checkout_id, payment_method } = req.body;

      const order = await query.selectColumns(
        'checkout', 
        { user_id: idUser, checkout_id }, 
        'total_price');

      if (!order) {
        return res
          .status(404)
          .json({ success: false, error: "Order not found" });
      }

      const amount = order.total_price;

      const reference = self.generatePaymentReference(payment_method);

      if (!reference) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid payment method" });
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

      await query.insert('payment', paymentData);
      res.json({ success: true, message: "payment berhasil" });

      const resi = self.generateTrackingNumber();

      const updateData = {
        shipment_status: "Dikirim",
        payment_status: "Paid",
        tracking_number: resi,
        updated_at: currentDate,
      };
      
      await query.update('checkout', 
      updateData, 
      { checkout_id: checkout_id });

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
});
