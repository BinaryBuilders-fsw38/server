const query = require("../model/query");

let self = (module.exports = {
  updateOrderStatus: async function (req, res) {
    try {
      console.log("controller connected");

      const { payment_id, status } = req.body;

      if (!payment_id || !status) {
        response.NOTFOUND(res, {
          status: "failed",
          message: "Invalid request",
          data: [],
        });
      }

      let shipmentStatus;

      switch (status.toLowerCase()) {
        case "sedang dikemas":
          shipmentStatus = "Sedang Dikemas";
          break;
        case "dikirim":
          shipmentStatus = "Dikirim";
          break;
        case "diterima":
          shipmentStatus = "Diterima"; // fixing
          break;
        default:
          return res
            .status(400)
            .json({ success: false, error: "Invalid status" });
      }

      const updateData = {
        shipment_status: shipmentStatus,
        updated_at: new Date(),
      };

      await query.update("payment", updateData, { payment_id });

      res.json({ success: true, message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating order status:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to update order status" });
    }
  },

  getShipmentStatus: async function (req, res) {
    try {
      console.log("getShipmentStatus connected");

      const { payment_id } = req.body;

      if (!payment_id) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid request" });
      }

      const shipmentStatus = await query.select("payment", {
        payment_id: payment_id,
      });

      res.json({ success: true, shipmentStatus });
    } catch (error) {
      console.error("Error getting shipment status:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to get shipment status" });
    }
  },
});
