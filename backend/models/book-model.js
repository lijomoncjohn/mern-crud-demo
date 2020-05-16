const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  addedOn: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Book', BookSchema)