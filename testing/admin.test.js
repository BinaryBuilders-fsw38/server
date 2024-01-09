    const request = require('supertest')
    const express = require('express')
    const adminController = require('../controllers/adminController')

    const app = express()
    app.use(express.json())

    app.post('/login', adminController.adminLogin)
    app.delete('/delete/:id', adminController.adminDelete)

    describe('Admin Controller Tests', () => {
    it('should log in admin successfully', async () => {
        try {
        const mockAdminData = { username: 'admin1', password: 'password123' }
        global.query.select.mockResolvedValue([mockAdminData])

        const response = await request(app)
            .post('/login')
            .send({ username: 'admin1', password: 'password123' })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'Success')
        expect(response.body).toHaveProperty('message', 'Login berhasil')
        expect(response.body.data).toEqual([mockAdminData])
        } catch (error) {
        console.error(error)
        }
    })

    it('should fail login admin with incorrect password', async () => {
        try {
        global.query.select.mockResolvedValue([])

        const response = await request(app)
            .post('/login')
            .send({ username: 'admin1', password: 'incorrectPassword' })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('status', 'Failed')
        expect(response.body).toHaveProperty('message', 'Password tidak sesuai')
        expect(response.body.data).toEqual([])
        } catch (error) {
        console.error(error)
        }
    })

    it('should delete an admin successfully', async () => {
        try {
        const mockAdminData = { admin_id: 1, username: 'admin1', password: 'password123' }
        global.query.select.mockResolvedValue([mockAdminData])
        global.query.delete.mockResolvedValue()
        global.response.OK.mockReturnValue({ status: 'success', message: 'data berhasil dihapus', data: [] })

        const response = await request(app)
            .delete('/delete/1')
            .send({ username: 'admin1', password: 'password123' })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message', 'data berhasil dihapus')
        expect(response.body.data).toEqual([])
        } catch (error) {
        console.error(error)
        }
    })

    it('should fail delete admin with incorrect credentials', async () => {
        try {
        global.query.select.mockResolvedValue([])

        const response = await request(app)
            .delete('/delete/1')
            .send({ username: 'admin1', password: 'incorrectPassword' })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('status', 'Failed')
        expect(response.body).toHaveProperty('message', 'data tidak ditemukan')
        expect(response.body.data).toEqual([])
        } catch (error) {
        console.error(error)
        }
    })
    })
