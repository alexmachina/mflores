let mongoose = require('mongoose')

let clausulaSchema = new mongoose.Schema({
  titulo: String,
  imagem: String,
  corpo: String
})

module.exports = clausulaSchema
