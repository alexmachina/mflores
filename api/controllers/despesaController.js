let despesaModel = require('../models/despesaModel')

let mongoose = require('mongoose')
class DespesaController {
  getDespesas(req, res) {
    let find = despesaModel.find({imovel : req.params.imovelId}).sort({ano: 1, mes: 1})
      .exec()
    find.then(despesas => {
      res.json(despesas)
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

    let find = despesaModel.find(query).exec()

    let count = despesaModel.aggregate([
      {$match: {'data': {$gte: dataInicial, $lte: dataFinal}}},
      {$group: {_id: null, count: {$sum: '$valor'}}}
    ])

      let operations = [find, count]
      Promise.all(operations).then(results => {
        debugger
        res.json({
          totalDespesas: results[1][0].count,
          despesas: results[0]
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
