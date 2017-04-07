let receitaModel = require('../models/receitaModel')

class ReceitaController {
  getReceitas(req, res) {
    receitaModel.find(req.params.imoveId).exec()
      .then(receitas => res.json(receitas))
  }

  addReceita(req, res) {
    let receita = new receitaModel(req.body)
    receita.save().then(() => res.send()).catch(err => res.status(500).send(err))
  }

  updateReceita(req, res) {
    let update = receitaModel.findByIdAndUpdate(id, {
      $set: req.body})
    update.then(() => res.send())
    update.catch(err => res.status(500).send(err))
  }
}

module.exports = new ReceitaController()
