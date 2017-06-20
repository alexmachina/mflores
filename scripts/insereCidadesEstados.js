require('dotenv').config()
const mongoose = require('mongoose')
const estadoModel = require('../api/models/estadoModel')
const cidadeModel = require('../api/models/cidadeModel')
const request = require('request')

mongoose.connect(process.env.DB_URI)

estadoModel.remove({}, err => {
  request('https://gist.githubusercontent.com/letanure/3012978/raw/36fc21d9e2fc45c078e0e0e07cce3c81965db8f9/estados-cidades.json',
    (error, response, body) => {
      let estados = JSON.parse(body).estados
      estados.forEach(e => {
        let estado = new estadoModel(e)
        let cidades = e.cidades.map(c =>{
          let obj = {nome: c}
          return obj
        })
        let promsCidade = []
        estado.save((err, est) => {
          cidades.forEach(c => {
            c.estado = est._id
            let cidade = new cidadeModel(c)
            promsCidade.push(cidade.save((err, cid) => {
            }))
          })
          Promise.all(promsCidade).then(results => {
            console.log(`Estado ${est.nome} salvo com ${results.length} cidades`)
          })
          
        })
      })
    })
})






