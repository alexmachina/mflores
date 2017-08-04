const mongoose = require('mongoose')

const clausulaSchema = new mongoose.Schema({
  texto: String,
  ordem: Number
})
const schema = new mongoose.Schema({
  tituloModelo: {type: String, required: true},
  tituloContrato: {type: String, required: true},
  corpo: String

})

module.exports = mongoose.model('Modelo', schema)
