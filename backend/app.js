const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const bookRoutes = require('./routes/book-routes')
const errorModel = require('./utils/custom-error')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})

app.use('/api/book', bookRoutes)

app.use((req, res, next) => {
    const error = new errorModel('Could not find this route.', 404)
    throw error;
  })

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error)
    }
    res.status(error.code || 500)
    res.json({
        success: false,
        message: error.message || 'An error occures while processing your request'
    })
  })

  mongoose
    .connect(
        'mongodb://localhost:27017/crud-db',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        app.listen(4000)
        console.log('server running on port 4000');
    })
    .catch(err => {
        console.log(err)
    })

app.listen(5000)