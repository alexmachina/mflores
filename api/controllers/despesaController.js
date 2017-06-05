let despesaModel = require('../models/despesaModel')
let ObjectId = require('mongoose').Types.ObjectId

let mongoose = require('mongoose')
class DespesaController {
  getDespesas(req, res) {
    const find = despesaModel.find({imovel : req.params.imovelId})
      .sort({data: 1})
      .limit(10)
      .skip((req.param('page')-1)*10)
      .exec(),
      findCount = despesaModel.count({imovel: req.params.imovelId}),

      soma = despesaModel.aggregate([{
        $match : { 'imovel' : new ObjectId(req.params.imovelId) },
      },
        {$group: {_id: null, count : {$sum: '$valor'}}}])

    const count = despesaModel.count({imovel : req.params.imovelId})

    let  operations = [find, findCount, soma]

    Promise.all(operations).then(results => {
      const [despesas, count] = results,
        response = {
          despesas,
          count,
          soma: results[2][0].count
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

    debugger
    let find = despesaModel.find(query).sort({data: 1}).exec()

    if(req.param('page')) {
      find = despesaModel.find(query)
        .sort({data: 1})
        .limit(10)
        .skip((req.param('page') - 1) * 10)
        .exec()
    }

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
      if(results[2] == 0)
        return res.status(404).send()
      res.json({
        totalDespesas: results[1][0].count,
        despesas: results[0],
        count: results[2]
      })
    }).catch(err => { 
      console.log(err)
      res.status(500).send(err) })
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

  deleteDespesa(req, res) {
    despesaModel.findByIdAndRemove(req.params.id).then(
      () => res.send()) 
      .catch(err => res.status(500).send(err))
  }
}

module.exports = new DespesaController()
