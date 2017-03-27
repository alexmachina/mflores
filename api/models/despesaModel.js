let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  descricao: {type:String, default: ''},
  valor: {type: Number, default: 0},
  data: {type:Date, default: null}
})

module.exports = schema
