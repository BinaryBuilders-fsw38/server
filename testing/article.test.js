    const request = require('supertest')
    const express = require('express')
    const articleController = require('../controllers/articleController')

    jest.mock('../model/query')
    const { query, response } = require('../model/query')

    const app = express()
    app.use(express.json())

    app.post('/add/:id', async (req, res) => {
    try {
        await articleController.addArticle(req, res)
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: [] })
    }
    })

    app.put('/update/:id', async (req, res) => {
    try {
        await articleController.updateArticle(req, res)
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: [] })
    }
    })

    app.get('/get/:title', async (req, res) => {
    try {
        await articleController.readArticle(req, res)
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: [] })
    }
    })

    app.delete('/delete/:id', async (req, res) => {
    try {
        await articleController.deleteArticle(req, res)
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: [] })
    }
    })

    describe('Article Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should add an article successfully', async () => {
        query.select.mockResolvedValue([{ admin_id: 1 }])

        const response = await request(app)
        .post('/add/1')
        .send({ title: 'Sample Article', contain: 'Sample Content' })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message', 'Artikel Berhasil Ditambahkan')
        expect(query.insert).toHaveBeenCalledWith('article', expect.any(Object))
    })

    it('should fail to add an article with missing fields', async () => {
        const response = await request(app)
        .post('/add/1')
        .send({ title: 'Sample Article' }) // Missing contain field

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('status', 'failed')
        expect(response.body).toHaveProperty('message', 'Artikel Gagal dibuat')
        expect(query.insert).not.toHaveBeenCalled()
    })


    it('should delete an article successfully', async () => {
        query.select.mockResolvedValue([{ article_id: 1 }])

        const response = await request(app).delete('/delete/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message', 'artikel berhasil dihapus')
        expect(query.delete).toHaveBeenCalledWith('article', { article_id: '1' })
    })

    it('should fail to delete a non-existing article', async () => {
        query.select.mockResolvedValue([])

        const response = await request(app).delete('/delete/1')

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('status', 'failed')
        expect(response.body).toHaveProperty('message', 'artikel tidak ada')
        expect(query.delete).not.toHaveBeenCalled()
    })
    })
