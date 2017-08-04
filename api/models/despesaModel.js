let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  descricao: {type:String, default: ''},
  valor: {type: Number, default: 0},
  data: {type: Date, default: null},
  dataVencimento: {type: Date, default: null},
  imovel: {type: mongoose.Schema.Types.ObjectId, ref: 'Imovel'},
  observacao: {type: String}
})

module.exports = mongoose.model('Despesa',schema)
