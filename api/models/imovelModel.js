let mongoose = require('mongoose'),
  enderecoModel = require('./enderecoModel'),
  metragemModel = require('./metragemModel'),
  despesaModel = require('./despesaModel'),
  imagemModel = require('./imagemModel'),
  locatarioModel = require('./locatarioModel')
  proprietarioModel = require('./proprietarioModel')
  websiteModel = require('./websiteModel')

let schema = new mongoose.Schema({
  titulo: {type: String, default: ''},
  rgi: {type: String, default: ''},
  instalacao: {type: String, default: ''},
  observacaoGestor: {type: String, default: ''},
  zoneamento: {type: Boolean, default: false},
  tipo:{type: {type: String, default: ''}},
  imagemPrincipal: {type:String, default: ''},
  precoVenda:{type:Number, default:null },
  precoLocacao: {type:Number, default: null},
  valorCondominio: {type:Number, defaul: null},

  endereco: {type: enderecoModel, default:enderecoModel},
  locatario: {type: locatarioModel, default: locatarioModel},
  proprietario: {type: proprietarioModel, default: proprietarioModel},
  metragem: {type: metragemModel, default: metragemModel},
  imagens: [imagemModel],
  despesas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Despesa'}],
  website: {type: websiteModel, default: websiteModel}

})

module.exports = mongoose.model('Imovel', schema)
