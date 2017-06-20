const proprietarioModel = require('../../models/proprietarioModel')
const imovelModel = require('../../models/imovelModel')
const despesaModel = require('../../models/despesaModel')
const receitaModel = require('../../models/receitaModel')
const ObjectId = require('mongoose').Types.ObjectId

function getSomaDespesasReceitas(imovel,dataInicial, dataFinal) {
  return new Promise((resolve, reject) => {
    let agg = [
      {$match: {$and : [
        {'data': {$gte: dataInicial, $lte: dataFinal}},
        {'imovel': new ObjectId(imovel._id)},
      ]}
      },
      {$group: {_id: null, count: {$sum: '$valor'}}}
    ]
   


    let queryDespesas = despesaModel.aggregate(agg)
    let queryReceitas = receitaModel.aggregate(agg)

    let operations = [queryDespesas, queryReceitas]

    Promise.all(operations).then(results => {
      let row = {
        titulo: imovel.titulo,
        proprietario: imovel.proprietario ? imovel.proprietario.nome : '',
        disponivel: imovel.website.disponivel ? 'Sim' : 'Não',
        totalReceitas: results[0][0] ? results[0][0].count : 'Nenhum lançamento',
        totalDespesas: results[1][0] ? results[1][0].count : 'Nenhum lançamento',

      }
      console.log(row)
      

      resolve(row)

    }).catch(err => reject(err))

  })
}

class RelatorioProprietariosController {
  getRelatorio(req, res) {
    imovelModel.find({'proprietario': req.params.proprietarioId, 'endereco.cidade':req.params.cidadeId})
      .populate('proprietario')
      .then(imoveis => {
        let operations = []

        imoveis.forEach(i => {
          operations.push(getSomaDespesasReceitas(i, new Date(parseInt(req.params.dataInicial)), new Date(parseInt(req.params.dataFinal)),req.params.cidadeId))
        })

        Promise.all(operations).then(results => {
          res.json(results)
        })
      })
  }
}

module.exports = new RelatorioProprietariosController()
