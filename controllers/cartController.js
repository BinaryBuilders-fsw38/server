    const query = require("../model/query");
    const response = require("../response/response")

    let self = module.exports = {
            addCart: async function (req, res) { //Function tambah cart
                const userId = parseInt(req.params.id)//mengambil user id dari params dan dijadikan integer
                const quantityUser = parseInt(req.body.quantity)//mengambil quantity dari req body dan dijadikan integer
                const currentDate = new Date()
                const product_id = parseInt(req.body.product_id)
                const cartData = {
                quantity: quantityUser,
                product_id,
                user_id: userId,
                created_at: currentDate,
                updated_at: currentDate,
                }
            
                const getCart = await query.selectAll('cart')
                const getProduct = await query.selectAll('product')
                // console.log(getProduct, '==>>> getproduct');
                const findProduct = getProduct.find((el)=> el.product_id === product_id)
                // console.log(getCart.length, 'get cart length');
                const findCart = getCart.find((el)=> el.product_id === product_id && el.user_id === userId)
                // console.log(findCart, 'FIND CART');
                if(!findProduct){ //validasi  product_id tidak ada dalam database
                    response.NOTFOUND(res,{status:'failed',
                                        message: 'product tidak ditemukan',
                                        data:[]})
                }else if (!findCart) {
                    await query.insert('cart', cartData)
                    response.CREATED(res, {
                    status: 'success',
                    message: 'Barang berhasil ditambahkan ke keranjang',
                    data: cartData,
                });
                }else {
                    // User belum bisa menambahkan product_id yang sudah ditambahkan oleh user lain ==> RESOLVED BY REKA
                    // mas eko tolong tambahan validasi ketika product_id yg diminta tidak ada dalam database.==> DONE
                    const updatedQuantity = findCart.quantity + quantityUser;
                    // console.log(findCart.quantity,'findcart quantity');
                    // console.log(updatedQuantity, 'updated quantity');
                    await query.update('cart',
                        {quantity: updatedQuantity, updated_at: currentDate},
                        {user_id: userId, product_id: product_id})
                    response.OK(res, {
                        status: 'success',
                        message: 'Keranjang berhasil diperbarui',
                        data: { ...findCart, quantity: updatedQuantity },
                })
                }
            },
        
        
        // fungsi delete cart by ID
        deleteCartByID: async function(req, res){
            const cart_id = req.params.id
            const getCart = await query.select('cart', {cart_id:cart_id})
            if(getCart.length > 0){
                await query.delete('cart', {cart_id:cart_id})
                response.OK(res, {
                    status: 'success', 
                    message: 'cart deleted', 
                    data: getCart
                })
            }else{
                response.NOTFOUND(res, {
                    status: 'failed', 
                    message: 'id product not found', 
                    data:[]
                })
            }
        }
    }
