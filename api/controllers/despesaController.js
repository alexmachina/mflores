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

  getDespesasByAnoMes(req, res) {
    let find = despesaModel.find({
      imovel: req.params.imovelId,
      ano: req.params.ano,
      mes: req.params.mes
    }).exec()

    let count = despesaModel.aggregate([
      {$match: { mes: parseInt(req.params.mes),
        ano: parseInt(req.params.ano),
        imovel: 
        mongoose.Types.ObjectId(req.params.imovelId)
                 }},

      {$group: {
        _id: {'ano': '$ano',
              'mes': '$mes'},
        count: {$sum: '$valor'}
      }}]).exec()
      

    let operations = [find, count]
    Promise.all(operations).then(results => {
      res.json({
        totalDespesas: results[1],
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
