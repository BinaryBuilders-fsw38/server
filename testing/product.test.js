    const request = require('supertest')
    const app = require('../routes/productroutes')

    describe('Product Controller', () => {
    it('should upload a product successfully', async () => {
        const response = await request(app)
        .post('/upload')
        .timeout({
            response: 10000,
            deadline: 60000  
        })
        .send({
            product_name: 'biore man',
            description: 'sabun pembersih muka',
            brand: 'Unilever',
            price: 150,
            stock: 20,
            category_id: 145693,
        })
        .attach('product_file', 'https://res.cloudinary.com/dcsvaufjv/image/upload/v1702313742/PRODUCT/utbsfbf2htuctuyrta80.png')

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message', 'product berhasil di upload')
        expect(response.body.data).toBeDefined()
    })

    it('should update a product successfully', async () => {
        const productIdToUpdate = 17
    
        const response = await request(app)
            .put(`/update/${productIdToUpdate}`)
            .timeout({
                response: 10000,
                deadline: 60000   
            })
            .send({
                product_name: 'biore man',
                description: 'sabun pembersih muka',
                brand: 'Unilever',
                price: 150,
                stock: 20,
                category_id: 145693,
            })
            .attach('product_file', 'https://res.cloudinary.com/dcsvaufjv/image/upload/v1702313742/PRODUCT/utbsfbf2htuctuyrta80.png')
    
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message', 'product updated')
        expect(response.body.data).toBeDefined();
    })
    

    it('should read products by brand successfully', async () => {
        const brandToRead = 'biore'

        const response = await request(app)
        .get(`/get/${brandToRead}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'data berhasil di select')
        expect(response.body.data).toBeDefined()
    });
    it('should delete a product successfully', async () => {
        const productIdToDelete = 18

        const response = await request(app)
        .delete(`/delete/${productIdToDelete}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message', 'product deleted')
        expect(response.body.data).toBeDefined()
    })
    })


    // untuk readproduct dan delete product sudah passed, tinggal upload dan update, masi aborted. belum resolve. resolve
    // dikarenaka ada asyncronus yang melebihi batas waktu run testing, disebabkan karena upload ke cludinary agak butuh waktu
    // response yang lama. RESOLVED by Reka

    // handle testing untuk req.file belum resolve.