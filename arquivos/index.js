//config incial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//forma de ler Json / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//routes
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Olá Povo' })
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apiclusterthiago.7cccrcj.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => {
        console.log('Conectamos o Mongo!')
        app.listen(3000)

    })
    .catch((err) => console.log(err))
