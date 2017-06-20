let mongoose = require('mongoose'),
  enderecoModel = require('./enderecoModel'),
  metragemModel = require('./metragemModel'),
  despesaModel = require('./despesaModel'),
  imagemModel = require('./imagemModel'),
  locatarioModel = require('./locatarioModel')
  websiteModel = require('./websiteModel')

let schema = new mongoose.Schema({
  titulo: {type: String, default: ''},
  rgi: {type: String, default: ''},
  instalacao: {type: String, default: ''},
  capacidadeInstalada: {type: String, default: ''},
  capacidadeDisponivel: {type: String, default: ''},
  observacaoGestor: {type: String, default: ''},
  zoneamento: {type: Boolean, default: false},
  tipo:{type: {type: String, default: ''}},
  imagemPrincipal: {type:String, default: ''},
  precoVenda:{type:Number, default:null },
  precoLocacao: {type:Number, default: null},
  valorCondominio: {type:Number, default: null},
  IPTU: {type: String, default: ''},
  valorAnualIPTU: {type: Number, default: null},
  valorParceladoIPTU: {type: String, default: null},

  proprietario: {type: mongoose.Schema.Types.ObjectId, ref: 'Proprietario', default: null},

  endereco: {type: enderecoModel, default:enderecoModel},
  locatario: {type: locatarioModel, default: locatarioModel},
  metragem: {type: metragemModel, default: metragemModel},
  imagens: [imagemModel],
  despesas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Despesa'}],
  website: {type: websiteModel, default: websiteModel}

})

module.exports = mongoose.model('Imovel', schema)
