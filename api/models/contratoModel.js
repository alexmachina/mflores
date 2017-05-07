const mongoose = require('mongoose')
const clausulaModel = require('./clausulaModel')

const schema = new mongoose.Schema({
  tipo: String,
  clausulas: [clausulaModel],
  cabecalho: String,
  rodape: String

})

module.exports = mongoose.model('Contrato', schema)


