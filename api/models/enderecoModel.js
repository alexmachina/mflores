let mongoose = require('mongoose')

let schema = mongoose.Schema({
  estado: {type: String, default: ''},
  cidade: {type: String, default: ''},
  cep: {type: String, default: ''},
  rua: {type: String, default: ''},
  numero: {type: String, default: ''},
  bairro: {type: String, default: ''},
  complemento: {type: String, default: ''},
  pontoDeReferencia: {type: String, default: ''}
})

module.exports = schema

