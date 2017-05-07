const contratoModel = require('../models/contratoModel')
const imovelModel = require('../models/imovelModel')

class ContratoController {
  addContrato(req, res) {
    const contrato = new contratoModel(req.body)
    const save = contrato.save()

    save.then(() => res.send())
  }

  getContrato(req, res) {
    const find = contratoModel.findById(req.params.id)
    find.then(contrato => res.json(contrato))
  }

  addClausula(req, res) {
   const update = contratoModel.findByIdAndUpdate(req.params.id,
      {$push: {'clausulas' : req.body}})
  
  update.then(res.send())

  }

  getContratos(req, res) {
    const find = contratoModel.find({}).exec()
    find.then(contratos => res.json(contratos))
  }

  getContratoImovel(req, res) {
    const findContrato = contratoModel.findById(req.params.contratoId).exec()
    const findImovel = imovelModel.findById(req.params.imovelId).exec()
    const operations = [findContrato, findImovel]

    Promise.all(operations).then(results => {
      console.log(results)
      let [contrato, imovel] = results
      contrato.clausulas.map(clausula => {
        clausula.corpo = clausula.corpo.replace('->nome_locatario', imovel.locatario.nome)
        return clausula
        })
      res.json(contrato)
    }).catch(err => res.status(500).send(err))

  }
}

module.exports = new ContratoController()
