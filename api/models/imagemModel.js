let mongoose = require('mongoose')

let imagemSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  arquivo: String
})

module.exports = imagemSchema
