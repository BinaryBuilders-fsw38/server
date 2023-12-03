
let self = module.exports = {
    addWishlist : async function (req, res) {
        const user_id = parseInt(req.params.id) 
        const product_id = parseInt(req.body.product_id)
        const created_at = new Date()
        const updated_at = new Date()
        const getUser = await query.select('user', {user_id : user_id})
        const getProduct = await query.select('product', {product_id : product_id})

        const data = {
            user_id : user_id,
            product_id : product_id,
            created_at : created_at,
            updated_at : updated_at
        }

    if(getUser.length > 0 || getProduct.length > 0) {
        await query.insert('wishlist', data)
        response.CREATED(res, {status: 'success', message: 'Wishlist Berhasil Ditambahkan', data : data })
    } else {
        response.ERROR(res, {status: 'failed', nessage: 'Wishlist Gagal Ditambahkan', data : []})
    }      
    }, 

    deleteWishlist: async function (req, res) {
        const user_id = parseInt(req.params.id) 
        const product_id = parseInt(req.body.product_id)
        const getUser = await query.select('user', {user_id : user_id})
        const getProduct = await query.select('product', {product_id : product_id})

        if (getUser.length > 0) {
            await query.delete('wishlist', {product_id : product_id})
            response.OK(res, {status: 'success', message: 'Wishlist Berhasil dihapus', data: getProduct})
        } else {
            respomse.NOTFOUND(res, {status: 'failed', message: 'Wishlist Tidak ada', data: []})
        }

    }
}