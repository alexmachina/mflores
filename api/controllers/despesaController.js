let despesaModel = require('../models/despesaModel')
let ObjectId = require('mongoose').Types.ObjectId

let mongoose = require('mongoose')
class DespesaController {
  getDespesas(req, res) {
    const find = despesaModel.find({imovel : req.params.imovelId})
      .sort({ano: 1, mes: 1})
      .limit(10)
      .skip((req.param('page')-1)*10)
      .exec(),
      findCount = despesaModel.count({imovel: req.params.imovelId}),
      operations = [find, findCount]

    Promise.all(operations).then(results => {
      const [despesas, count] = results,
        response = {
          despesas,
          count
        }
      res.json(response)
    })



    find.catch(err => res.status(500).send(err))
  }

  getDespesasByData(req, res) {
    let dataInicial = new Date(parseInt(req.params.dataInicial))
    let dataFinal = new Date(parseInt(req.params.dataFinal))
    let query = { 
      imovel: req.params.imovelId,
      data: {$gte: dataInicial, $lte: dataFinal}
    }

    let find = despesaModel.find(query)
      .limit(10)
      .skip((req.param('page') - 1) * 10)
      .exec()

    let countValor = despesaModel.aggregate([
      {$match: {$and : [
        {'data': {$gte: dataInicial, $lte: dataFinal}},
        {'imovel': new ObjectId(req.params.imovelId)}
      ]}
      },
      {$group: {_id: null, count: {$sum: '$valor'}}}
    ])

    let countItems = despesaModel.count(query).exec()

    let operations = [find, countValor, countItems]
    Promise.all(operations).then(results => {
      debugger
      res.json({
        totalDespesas: results[1][0].count,
        despesas: results[0],
        count: results[2]
      })
    })
  }

  addDespesa(req, res) {
    let despesa = new despesaModel(req.body)
    despesa.imovel = req.params.id
    despesa.save(() => res.send()).catch(err => res.status(500).send(err))
  }

  updateDespesa(req, res) {
    let  update = despesaModel.findByIdAndUpdate(req.params.id, 
      {$set: req.body})

    update.then(() => res.send())
    update.catch(err => res.status(500).send(err))
  }
}

module.exports = new DespesaController()
