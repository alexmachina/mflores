let mongoose = require('mongoose'),
  enderecoModel = require('./enderecoModel'),
  metragemModel = require('./metragemModel'),
  despesaModel = require('./despesaModel'),
  imagemModel = require('./imagemModel'),
  locatarioModel = require('./locatarioModel')
  proprietarioModel = require('./proprietarioModel')

let schema = new mongoose.Schema({
  titulo: {type: String, default: ''},
  rgi: {type: String, default: ''},
  instalacao: {type: String, default: ''},
  observacaoGestor: {type: String, default: ''},
  observacaoWebsite: {type: String, default: ''},
  disponivelWebsite: {type: Boolean, default: false},
  principalWebsite: {type: Boolean, default: false},
  zoneamento: {type: Boolean, default: false},
  tipo:{type: {type: String, default: ''}},
  destaqueWebsite:{type: Boolean, default: false},
  subtituloWebsite:{type: String, default: ''},
  imagemPrincipal: {type:String, default: ''},

  endereco: {type: enderecoModel, default:enderecoModel},
  locatario: {type: locatarioModel, default: locatarioModel},
  proprietario: {type: proprietarioModel, default: proprietarioModel},
  metragem: {type: metragemModel, default: metragemModel},
  imagens: [imagemModel],
  despesas:[{type: mongoose.Schema.Types.ObjectId, ref: 'Despesa'}] 

})

module.exports = mongoose.model('Imovel', schema)
