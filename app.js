const express   = require('express')
const app      = express()
const cors      = require('cors')
const routes = require('./routes/routes')
require('dotenv').config({path: './env/.env'})
const port      = '3000'

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.use('/', routes)

app.listen(port, () => {
    console.log(`i love u Binar ${port}`);
})