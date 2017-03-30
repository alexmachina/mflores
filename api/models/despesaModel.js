let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  descricao: {type:String, default: ''},
  valor: {type: Number, default: 0},
  mes: Number,
  ano: Number,
  imovel: {type: mongoose.Schema.Types.ObjectId, ref: 'Imovel'}
})

module.exports = mongoose.model('Despesa',schema)
