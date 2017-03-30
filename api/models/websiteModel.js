let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  descricao: {type:String, default: ''},
  principal: {type: Boolean, default: false},
  carrossel: {type: Boolean, default: false},
  homepage: {type: Boolean, default: false},
  subtitulo: {type: String, default: ''},
  titulo: {type: String, default: ''},
  disponivel: {type: Boolean, default: false}
})

module.exports = schema
