const mongoose = require('mongoose'),
  schema = new mongoose.Schema({
    titulo: {type: String, required: true},
    modelo: {type: mongoose.Schema.Types.ObjectId, ref: 'Modelo'},
    imovel: {type: mongoose.Schema.Types.ObjectId, ref: 'Imovel'},
    proprietario: {type: mongoose.Schema.Types.ObjectId, ref:'Proprietario'},
    corpo: String,
    status: String
  })

module.exports = mongoose.model('Contrato', schema)
