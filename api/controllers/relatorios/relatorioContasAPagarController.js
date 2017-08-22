const proprietarioModel = require('../../models/proprietarioModel')
const imovelModel = require('../../models/imovelModel')
const despesaModel = require('../../models/despesaModel')
const receitaModel = require('../../models/receitaModel')
const ObjectId = require('mongoose').Types.ObjectId
const _ = require('underscore')

function getDespesas(imovel,dataVencimentoInicial, dataVencimentoFinal) {
  return new Promise((resolve, reject) => {
    let query = {dataVencimento:{$gte: dataVencimentoInicial, $lte: dataVencimentoFinal},
      imovel: new ObjectId(imovel._id)
    }
    let queryDespesas = despesaModel.find(query).sort({dataVencimento: 1}).exec()

    queryDespesas.then(despesas => {
      if(despesas.length) {
        const rows = despesas.map(d => {
          return {
            titulo: imovel.titulo,
            dataVencimento: d.dataVencimento,
            dataPagamento: d.data,
            valor: d.valor ? d.valor : 0,
            observacao: d.observacao ? d.observacao : ''
          }
        })

        resolve(rows)
      } else {
        resolve(null)
      }
    })

  })

}

function pushElm(from, to) {
  from.forEach(f => {
    to.push(f)
  })
}

class RelatorioContasAPagarController {
  getRelatorio(req, res) {
    imovelModel.find({'proprietario': req.params.proprietarioId, 'endereco.cidade':req.params.cidadeId})
      .populate('proprietario')
      .then(imoveis => {
        let operations = []
        const dataVencimentoInicial = new Date(parseInt(req.params.dataVencimentoInicial))
        const dataVencimentoFinal = new Date(parseInt(req.params.dataVencimentoFinal))


        imoveis.forEach(i => {
          operations.push(getDespesas(i, dataVencimentoInicial, dataVencimentoFinal))
        })

        Promise.all(operations).then(results => {
          let rows = results.filter(r => {
            if(r)
              return true
          })

          let plinio = []
          rows.forEach(r => {
            if(Array.isArray(r)) {
              pushElm(r, plinio)
            } else {
              plinio.push(r)
            }
          })
          plinio = _.sortBy(plinio, o => o.dataVencimento)

          let total = plinio.reduce((a, b) => {
            return a + b.valor
          },0)

          res.json({despesas:plinio, total})
        })
      })
  }
}

module.exports = new RelatorioContasAPagarController()
