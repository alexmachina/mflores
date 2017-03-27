let imovelModel = require('../models/imovelModel')
let imagemModel = require('../models/imagemModel')

class ImovelController {
  addImovel(req, res) {
    let titulo = req.body.titulo
    let imovel = new imovelModel({titulo})
    imovel.save().then(i => res.send(i._id))

  }

  getImovel(req, res) {
    let findOne = imovelModel.findById(req.params.id).exec()
    findOne.then(imovel => {
     return res.json(imovel)
    }
    )
  } 
  getImoveis(req, res){ 
    let search = req.param('search')
    let query = search ? {'titulo' : new RegExp(search, 'i')} : {}
    let findCount = imovelModel.count(query)
    findCount.then(count => {

      let findAll = imovelModel.find(query)
        .limit(10).skip((req.param('page') -1) * 10)
        .exec()
      findAll.then(imoveis => res.json({imoveis, count}))
      findAll.catch(err => res.status(500).send(err))

    })
  }

  updateImovel(req, res) {
    let update = imovelModel.findByIdAndUpdate(req.params.id,
      {$set : req.body})
    update.then(() => res.send())
    update.catch(err => res.status(500).send(err))
  }

  addImage(req, res) {
    if(req.file) {
      let imagem = req.body
      let arquivo = req.file.filename
      imagem.arquivo = arquivo


      imovelModel.findByIdAndUpdate(req.params.id, 
        {$push: {'imagens' : imagem}},
        {safe: true, upsert: true}).then(() => {
          return res.send()
        })
    } else {
      return res.send()
    }

  }

  deleteImage(req, res) {
    let find = imovelModel.findById(req.params.id).exec()

    find.then(imovel => {
      imovel.imagens.id(req.params.imageId).remove()
      imovel.save().then(res.send())
    })
  }

  updateImage(req, res) {
    imovelModel.findById(req.params.id).exec()
      .then(imovel => {
        let imagem = imovel.imagens.id(req.params.imageId)

        if(req.file) {
          imagem.arquivo = req.file.filename
        } else {
          delete req.body.arquivo
        }

        Object.assign(imagem, req.body)
        imovel.markModified('imagens')
        imovel.save().then(i => {
          console.log('OK')
          res.send()
        })
      })
  }

  addDespesa(req, res) {
    let despesa = req.body
    imovelModel.findByIdAndUpdate(req.params.id,
      {$push: {'despesas' : despesa}})
      .then(() => {
        res.send()
      }).catch(err => res.status(500).send(err))

  }

  getDespesas(req, res) {
    let page = req.param('page') ? req.param('page') : 0
    imovelModel.findOne({'_id':req.params.id}, {despesas: {$slice: [((page-1) * 10), 10]}})
      .exec().then(imovel => {
        imovelModel.findById(req.params.id).exec().then(imovelCount => {
          res.json({
            despesas: imovel.despesas,
            count: imovelCount.despesas.length
          })
        })
      })

  }
  updateDespesa(req, res) {
    let despesa = req.body
    console.log(despesa)
    imovelModel.update({'_id': req.params.id, 'despesas._id' : req.params.despesaId},
      {'$set' : {'despesas.$' : despesa}}).then(() => {
        res.send()
      })

  }
}

module.exports = new ImovelController()
