let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  descricao: String,
  valor: Number,
  data: Date,
  dataVencimento: Date,
  modoPagamento: String,
  imovel: {type: mongoose.Schema.Types.ObjectId, ref:'Imovel'},
  observacao: String
})

module.exports = mongoose.model('Receita', schema)
