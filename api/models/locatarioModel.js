let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  cpfCnpj: {type: String, default: ''},
  nome:{type: String, default: ''},
  rgInscricao: {type: String, default: ''},
  responsavel: {type: String, default: ''},
  telefone: {type: String, default: ''},
  celular: {type: String, default: ''},
  email: {type: String, default: ''},
  dataInicioContrato: {type: Date, default:null},
  dataFimContrato: {type: Date, default: null},
  valor: {type:Number, default: ''},
  indiceDeReajuste: {type: String, default: ''},
  seguro: {type: Boolean, default: ''},
  garantia: {type: String, default: ''},
  descricaoGarantia:{type:String, default: ''},
  dataInicioValidadeGarantia: {type: Date, default: null },
  dataFimValidadeGarantia: {type: Date, default:null },
  dataVencimentoSeguro: {type:Date, default:null}
})

module.exports = schema
