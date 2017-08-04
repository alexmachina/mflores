const modeloModel = require('../models/modeloModel'),
  contratoModel = require('../models/contratoModel')

class ModeloController {
  getPage(req, res) {
    const page = req.params.page,
      find = modeloModel
      .find({})
      .skip((page -1) * 10)
      .limit(10)
      .exec()

    find.then(modelos => res.json(modelos))
    find.catch(err => res.status(500).json({message: err}))

  }

  getCount(req, res) {
    modeloModel.count({}).then(count => res.json({count}))
  }

  getModelos(req, res) {
    const query = modeloModel
      .find({})
      .select('_id titulo')
      .exec()

    query.then(modelos => res.json(modelos))
    query.catch(err => res.json({message: err}))
  }

  getModelo(req, res) {
    const modeloId = req.params.modeloId,
      query = modeloModel.findById(modeloId)

    query.then(modelo => res.json(modelo))
    query.catch(err => res.status(500).json({message: err}))
  }

  getContratos(req, res) {
    const modeloId = req.params.modeloId,
    query = contratoModel
      .find({modelo : modeloId})
      .exec()

    query.then(contratos => res.json(contratos))
    query.catch(err => res.status(500).json({message: err}))
  }

  addModelo(req, res) {
    const modelo = new modeloModel(req.body)

    modelo.save()
      .then(modelo => res.json(modelo))
      .catch(err => res.status(500).json({message: err}))
  }

  updateModelo(req, res) {
    const modeloId = req.params.modeloId,
      modelo = req.body

    const update = modeloModel.findByIdAndUpdate(
      modeloId,
      modelo,
      {new: true})

    update.then(modelo => res.json(modelo))
    update.catch(err => res.status(500).json(err))

  }

  deleteModelo(req, res) {
    const modeloId = req.params.modeloId

    modeloModel.findByIdAndRemove(modeloId)
      .then(() => res.json({message: `Modelo ${modeloId} removido`}))
      .catch(err => res.status(500).json(err))
  }

}

module.exports = new ModeloController()
