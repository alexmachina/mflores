const contratoModel = require('../models/contratoModel'),
  estadoModel = require('../models/estadoModel'),
  cidadeModel = require('../models/cidadeModel'),
  imovelModel = require('../models/imovelModel'),
  libContrato = require('../libs/contrato'),
  modeloModel = require('../models/modeloModel')

class ContratoController {
  getContratosPage(req, res) {
    const page = req.params.page,
      query = contratoModel
      .find({})
      .skip((page -1) * 10)
      .limit(10)
      .exec()

    query.then(contratos => res.json(contratos))
    query.catch(err => res.json({message: err}))

  }

  getCount(req, res) {
    const query = contratoModel.count({})

    query.then(count => res.json({count}))
    query.catch(err => res.status(500).json({message: err}))
  }

  getContrato(req, res) {
    const contratoId = req.params.contratoId

    contratoModel.findById(contratoId)
      .then(contrato => res.json(contrato))
      .catch(err => res.status(500).json({message: err}))
  }

  addContrato(req, res) {
    const contrato = req.body,
      modeloId = contrato.modelo


    contrato.status = 0

    const Contrato = new contratoModel(contrato),
      save = Contrato.save()

    save.then(contrato => {
      contratoModel.findById(contrato._id)
        .populate({
          path: 'imovel',
          populate: {path: 'endereco.estado endereco.cidade' }
        })
        .populate({
          path: 'proprietario',
          populate: {path: 'endereco.estado endereco.cidade'}
        })
        .exec()
        .then(contrato => {

          const findModelo =  modeloModel.findById(modeloId)
          findModelo.then(modelo => {
            const gerarCorpo =  libContrato.gerarCorpo(modelo.corpo, contrato)
            gerarCorpo.then(corpo => {
              contrato.corpo = corpo
              contrato.status = 1
              contrato.save().then(() => res.json(contrato))
            })

            gerarCorpo.catch(err => res.status(500).json({message: err}))
          })

          findModelo.catch(err => res.status(500).json({message: err}))
        })
    })
    save.catch(err => res.status(500).json({message: err}))
  }

  updateContrato(req, res) {
    const contratoId = req.params.contratoId,
      contrato = req.body,
      query = contratoModel.findByIdAndUpdate(
        contratoId,
        {$set: contrato},
        {new: true}
      )

    query.then(contrato => res.json(contrato))
    query.catch(contrato => res.status(500).json({message: contrato}))
  }

  deleteContrato(req, res) {
    const contratoId = req.params.contratoId,
      query = contratoModel.findByIdAndRemove(contratoId)

    query.then(() =>
      res.json({message: `Contrato ${contratoId} deletado`})
    )

    query.catch(err => res.status(500).json({message: err}))
  }


}

module.exports = new ContratoController()
