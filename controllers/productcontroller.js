

let self = module.exports = {
    // untuk menampilkan product 
    readProduct: async function (req, res) {
        const brand = req.params.brand
        const getProduct  = await query.select('product', {brand: brand})
        if (getProduct.length === 0) {
            response.NOTFOUND(res, {status: 'failed', message: 'product not found', data: []})
        }else {
            response.OK(res, {status: 'success', message: 'data berhasil di select', data: getProduct})
        }
    },
    // untuk menambahkan product
    uploadProduct: async function (req, res) {
        const {product_name, description, brand, price, stock, category_id} = req.body
        const product_file = req.file
        const currentDate = new Date()

        const inserProduct = {
            product_name,
            product_file: product_file.path, 
            description,
            brand,
            price,
            stock,
            category_id,
            created_at: currentDate,
            updated_at: currentDate
        }

        if (!inserProduct) {
            response.ERROR(res, {status: 'failed', message: 'filed tidak boleh kosong', data: []})
        }else {
            await query.insert('product', inserProduct)
            response.CREATED(res, {ststus: 'success', message: 'product berhasil di upload', data: inserProduct})
        }
    },
    // untuk update product berdasarkan params id product 
    updateProduct: async function (req, res){
        const product_id = req.params.id
        const {product_name, description, brand, price, stock, category_id} = req.body
        const product_file = req.file
        const currentDate = new Date()

        const getProduct = await query.select('product', {product_id: product_id})

        if (getProduct.length > 0) {
            const inserProduct = {
            product_name,
            product_file: product_file.path, 
            description,
            brand,
            price,
            stock,
            category_id,
            created_at: currentDate,
            updated_at: currentDate
            }
            await query.update('product', inserProduct, {product_id})
            response.OK(res, {status: 'success', message: 'product updated', data: inserProduct})
        }else {
            response.NOTFOUND(res, {status: 'failed', message: 'product tidak ditemukan', data: []})
        }
    },
// untuk menghapus product beserta data keseluruhannya
    deleteProduct: async function (req, res) {
        const product_id = req.params.id
        const getProduct = await query.select('product', {product_id: product_id})
        if (getProduct.length > 0) {
            await query.delete('product', {product_id: product_id})
            response.OK(res, {status: 'success', message: 'product deleted', data: getProduct})
        }else {
            response.NOTFOUND(res, {status: 'failed', message: 'product not found', data: []})
        }
    }
}

// belum menambahkan validasi 