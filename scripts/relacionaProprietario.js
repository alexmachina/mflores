let mongoose = require('mongoose')
require('dotenv').config()
let imovelModel = require('../api/models/imovelModel')
mongoose.connect(process.env.DB_URI)


imovelModel.find({}, (err, imoveis => {
  if (err)
    return console.log(err)

  imoveis.forEach((i) => {
    relacionaProprietario(i).then(proprietario => {
      console.log('Imovel ',i.titulo, ' Proprietário ',proprietario.nome)
    })
  })
})

