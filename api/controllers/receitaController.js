let receitaModel = require('../models/receitaModel')
let ObjectId = require('mongoose').Types.ObjectId

class ReceitaController {
  getReceitas(req, res) {
    const findReceitas = receitaModel.find({imovel: req.params.imovelId})
      .limit(10)
      .skip((req.param('page') - 1) * 10)
      .exec(),

      findCount = receitaModel.count({imovel: req.params.imovelId}),
    operations = [findReceitas, findCount]

    Promise.all(operations).then(results => {
      let [receitas, count] = results
      res.json({receitas, count})
    })
  }

  addReceita(req, res) {
    let receita = new receitaModel(req.body)
    receita.save().then(() => res.send()).catch(err => res.status(500).send(err))
  }

  updateReceita(req, res) {
    let update = receitaModel.findByIdAndUpdate(req.params.receitaId, {
      $set: req.body})
    update.then(() => res.send())
    update.catch(err => res.status(500).send(err))
  }

  getReceita(req, res) {
    let find = receitaModel.findById(req.params.receitaId).exec()
    find.then(receita => {
      res.json(receita) })
    find.catch(err => res.status(500).send(receita))
  }

  getReceitasByData(req, res) {
    let dataInicial = new Date(parseInt(req.params.dataInicial))
    let dataFinal = new Date(parseInt(req.params.dataFinal))
    let query = {
      imovel: new ObjectId(req.params.imovelId),
      data: {$gte: dataInicial, $lte: dataFinal}
    }

    let find = receitaModel.find(query)
      .limit(10)
      .skip((req.param('page') -1) * 10)
      .exec()

    let totalReceitas = receitaModel.aggregate([
      {$match: {$and: [
        {'data' : {$gte: dataInicial, $lte: dataFinal} },
        {'imovel' : new ObjectId(req.params.imovelId) }
      ]}},
      {$group: {'_id': null, count: {$sum: '$valor'}}}
    ])
    let count = receitaModel.count(query)

    let operations = [find, totalReceitas, count]
    Promise.all(operations).then(result => {
      let response = {
        receitas: result[0],
        totalReceitas: result[1][0].count,
        count: result[2]
      }
      res.json(response)
    })
  }
}

module.exports = new ReceitaController()
