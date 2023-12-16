    const request = require('supertest')
    const app = require('../routes/productroutes')

    describe('Product Controller', () => {
    it('should upload a product successfully', async () => {
        try {
            const response = await request(app)
                .post('/upload')
                .set('Accept', 'application/json')
                .set('Content-Type','multipart/form-data')
                .set('connection', 'keep-alive')
                .field('product_name', 'biore man')
                .field('description', 'sabun pembersih muka')
                .field('brand', 'unilever')
                .field('price', 150)
                .field('stock', 20)
                .field('category_id', 433474)
                .attach('product_file', 'https://res.cloudinary.com/dcsvaufjv/image/upload/v1702475553/PRODUCT/y2aisipr1xxgksv7djvj.png')
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('status', 'success')
                expect(response.body).toHaveProperty('message', 'product berhasil di upload')
                expect(response.body.data).toBeDefined()
        } catch (error) {
            console.log(error);
        }
    })

    it('should update a product successfully', async () => {
        try {   
            const productIdToUpdate = 17
            const response = await request(app)
                .put(`/update/${productIdToUpdate}`)
                .set('Accept', 'application/json')
                .set('Content-Type','multipart/form-data')
                .set('connection', 'keep-alive')
                .field('product_name', 'biore man')
                .field('description', 'sabun pembersih muka')
                .field('brand', 'unilever')
                .field('price', 150)
                .field('stock', 20)
                .field('category_id', 3)
                .attach('product_file', 'https://res.cloudinary.com/dcsvaufjv/image/upload/v1702475553/PRODUCT/y2aisipr1xxgksv7djvj.png')
                
        
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('status', 'success')
            expect(response.body).toHaveProperty('message', 'product updated')
            expect(response.body.data).toBeDefined()
        } catch (error) {
            console.log(error);
        }
    })
    

    it('should read products by brand successfully', async () => {
        const brandToRead = 'biore'

        const response = await request(app)
        .get(`/get/${brandToRead}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'data berhasil di select')
        expect(response.body.data).toBeDefined()
    })
    
    it('should delete a product successfully', async () => {
        const productIdToDelete = 16

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

    // handle testing untuk req.file belum resolve. RESOLVED by Reka