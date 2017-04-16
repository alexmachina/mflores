let imovelModel = require('../models/imovelModel')
let imagemModel = require('../models/imagemModel')
let fs = require('fs')
let path = require('path')

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
    console.log(req.body)
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
    imovelModel.findOne({'_id':req.params.id}, {despesas: {$slice: [((page-1) * 10), 10]}},
      {sort: '-despesas.date'})
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
  updateImagemPrincipal(req, res) {
    let update = imovelModel.findByIdAndUpdate(req.params.id,
      {$set: {imagemPrincipal: req.file.filename}})

    update.then(() => res.send())
    update.catch(err => res.status(500).send(err))
  }
  getDestaques(req, res) {
    let find = imovelModel.find({destaqueWebsite: true, disponivelWebsite: true})

    find.then(imoveis => res.json(imoveis))
    find.catch(err => res.status(500).send(err))
  find.catch(err => res.send(err))
  }

  getCarrossel(req, res) {
    let find = imovelModel.find({'website.carrossel':true, 'website.disponivel':true})
    find.then(imoveis => {
      res.json(imoveis)
    })
    find.catch(err => res.status(500).send(err))
  }

  getHomepage(req, res){
    let find = imovelModel.find({'website.homepage':true, 'website.disponivel':true})
    find.then(imoveis => res.json(imoveis))
    find.catch(err => res.send(err))
  }
  getPrincipal(req, res) {
    let find = imovelModel.findOne({'website.principal': true, 'website.disponivel':true})
    find.then(imovel => res.json(imovel))
    find.catch(err => res.status(500).send(err))
  }

getImoveisByPriceRange(req, res) {
    let from = req.params.from
    let to = req.params.to

    let find = imovelModel.find({$and: [{ preco: { $gte: from} }, { preco : {$lte: to} } ]}).exec()
    find.then(imoveis => res.json(imoveis))
    find.catch(err => res.send(err))
}
searchImoveis(req, res) {
  let query = { $or: [
    {'website.titulo' : {$regex: new RegExp(req.params.search, 'i')}},
    {'website.subtitulo': {$regex: req.params.search}}
  ]}

  let page = req.param('page')

  let findCount = imovelModel.count(query)

  let find = imovelModel.find(query).skip((page -1)*12).limit(12).exec()
  let operations = [find, findCount]

  Promise.all(operations).then(result => {
    console.log(result)
    let [imoveis, count] = result
    res.json({count,imoveis})
  }).catch(err => res.status(500).send(err))
}
}



module.exports = new ImovelController()
