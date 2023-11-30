const query = require("../model/query");
const response = require("../response/response")

let self = module.exports = {
    addCart : async function(req, res){ //Function tambah cart
        const userId = parseInt(req.params.id) //mengambil user id dari params dan dijadikan integer
        const quantityUser = parseInt(req.body.quantity) //mengambil quantity dari req body dan dijadikan integer
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
        if(getCart.length === 0){
            await query.insert('cart', cartData)
            response.CREATED(res, {
                status : 'succes', 
                message : 'barang berhasil ditambahkan', 
                data:cartData})
// User belum bisa menambahkan product_id yang sudah ditambahkan oleh user lain
        }else if(getCart.length > 0) {
            const updatedCart = getCart.map(el => ({
                ...el,
                quantity: el.quantity + quantityUser
              }));  
            //   console.log(updatedCart, "---update cart");
            await query.update('cart', updatedCart[0], {product_id:product_id})
            response.OK(res, {
                status : 'succes', 
                message : 'cart berhasil diupdate', 
                data:updatedCart})
        }else{
            response.ERROR(res, {
                status : 'failed', 
                message : 'cart gagal ditambahkan', 
                data:[]})
        }
    },
    
    // fungsi delete cart by ID
    deleteCartByID: async function(req, res){
        const cart_id = req.params.id
        const getCart = await query.select('cart', {cart_id:cart_id})
        if(getCart.length > 0){
            await query.delete('cart', {cart_id:cart_id})
            response.OK(res, {
                status : 'success', 
                message : 'cart deleted', 
                data : getCart
            })
        }else{
            response.NOTFOUND(res, {
                status : 'failed', 
                message : 'id product not found', 
                data:[]
            })
        }
    }
}


// membuat fungsi mengurangi stok di produk setelah masuk cart
// 