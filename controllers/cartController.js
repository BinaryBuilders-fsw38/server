const query = require("../model/query");
const response = require("../response/response")

let self = module.exports = {
    addCart : async function(req, res){
        const userId = parseInt(req.params.id)
        const quantityUser = parseInt(req.body.quantity)
        const currentDate = new Date();
        const product_id = parseInt(req.body.product_id)
        const cartData = {
            quantity:quantityUser,
            product_id,
            user_id : userId,
            created_at :currentDate,
            updated_at : currentDate
        }
        const getCart = await query.select('cart', {product_id:product_id})

        // console.log(getCart.length, "panjang array");
        if(getCart.length === 0){
            await query.insert('cart', cartData)
            response.CREATED(res, {status : 'succes', message : 'barang berhasil ditambahkan', data:cartData})
        }else if(getCart.length > 0) {
            const updatedCart = getCart.map(el => ({
                ...el,
                quantity: el.quantity + quantityUser
              }));  
            //   console.log(updatedCart, "---update cart");
            await query.update('cart', updatedCart[0], {product_id:product_id})
            response.OK(res, {status : 'succes', message : 'database berhasil diupdate', data:updatedCart})
        }else{
            response.ERROR(res, {status : 'failed', message : 'gagal ditambahkan', data:[]})
        }
    }
}

// membuat fungsi delete cart
// membuat fungsi mengurangi stok di produk setelah masuk cart
// 