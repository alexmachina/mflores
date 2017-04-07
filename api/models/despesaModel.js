let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  descricao: {type:String, default: ''},
  valor: {type: Number, default: 0},
  data: {type: Date, default: null},
  imovel: {type: mongoose.Schema.Types.ObjectId, ref: 'Imovel'}
})

module.exports = mongoose.model('Despesa',schema)
