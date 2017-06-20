const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nome: {type: String, required: true},
  estado: {type: mongoose.Schema.Types.ObjectId}
})

module.exports = mongoose.model('Cidade',schema)
