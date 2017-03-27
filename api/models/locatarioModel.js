let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  cpfCnpj: {type: String, default: ''},
  rgInscricao: {type: String, default: ''},
  responsavel: {type: String, default: ''},
  telefone: {type: String, default: ''},
  celular: {type: String, default: ''},
  email: {type: String, default: ''},
  dataInicioContrato: {type: Date, default: new Date()},
  dataFimContrato: {type: Date, default: new Date()},
  valor: {type:Number, default: ''},
  seguro: {type: Boolean, default: ''},
  dataVencimentoSeguro: {type:Date, default:''}
})

module.exports = schema
