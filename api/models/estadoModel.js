const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nome: {type: String, required:true},
  sigla: {type: String, required:true},
})

module.exports = mongoose.model('Estado',schema)
