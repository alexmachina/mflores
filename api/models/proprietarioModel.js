let mongoose = require('mongoose')
let enderecoModel = require('./enderecoModel')

let schema = new mongoose.Schema({
  cpfCnpj: {type: String, default: ''},
  rgInscricao: {type: String, default: ''},
  nome: {type: String, default: ''},
  telefone: {type: String, default: ''},
  celular: {type: String, default: ''},
  email: {type: String, default: ''},
  endereco: {type: enderecoModel, default: enderecoModel}
})

module.exports = mongoose.model('Proprietario', schema)
