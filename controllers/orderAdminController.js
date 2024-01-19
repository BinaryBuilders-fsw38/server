let self = (module.exports ={

    orderAdmin : async function(req, res){
        const {user_id, checkout_id, shipment_status, payment_status} = req.body
        const currDate = new Date()
        const getDataCheckout = await query.select("checkout", {checkout_id:checkout_id})
        const getUserId = await query.select("user", {user_id})
        const inputData = {
            shipment_status:shipment_status,
            payment_status:payment_status
        }

        if(getDataCheckout[0].shipment_status === "Belum Dikirim"){
            await query.update("checkout", inputData, {checkout_id})
            response.OK(res, {
                status : "success",
                message : "Order berhasil ditambahkan",
                data : inputData,
            })
        }else {
            response.ERROR(res, {
                status : "failed",
                message : "ID tidak ada",
                data : [],
            })
        }
    }
})