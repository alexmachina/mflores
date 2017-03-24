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
    let findAll = imovelModel.find({}).exec()
    findAll.then(imoveis => res.json(imoveis))
    findAll.catch(err => res.status(500).send(err))
  }

  updateImovel(req, res) {
    let update = imovelModel.findByIdAndUpdate(req.params.id,
      {$set : req.body})
    update.then(() => res.send())
    update.catch(err => res.status(500).send(err))
  }

  addImage(req, res) {
    let imagem = req.body
    let arquivo = req.file.filename
    imagem.arquivo = arquivo

    imovelModel.findByIdAndUpdate(req.params.id, 
      {$push: {'imagens' : imagem}},
      {safe: true, upsert: true}).then(() => {
        return res.send()
      })

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

        debugger
       imagem = Object.assign({}, imagem, req.body)
        if(req.file)
          imagem.arquivo = req.file.filename
        imovel.markModified('imagens')
      debugger
        imovel.save().then(i => {
          console.log('OK')
          res.send()
        })
      })
  }
}

module.exports = new ImovelController()
