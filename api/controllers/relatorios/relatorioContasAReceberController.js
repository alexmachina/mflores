const proprietarioModel = require('../../models/proprietarioModel')
const imovelModel = require('../../models/imovelModel')
const receitaModel = require('../../models/receitaModel')
const ObjectId = require('mongoose').Types.ObjectId
const _ = require('underscore')

function getReceitas(imovel,dataVencimentoInicial, dataVencimentoFinal) {
  return new Promise((resolve, reject) => {
    let query = {dataVencimento:{$gte: dataVencimentoInicial, $lte: dataVencimentoFinal},
      imovel: new ObjectId(imovel._id)
    }
    let queryReceitas = receitaModel.find(query).sort({dataVencimento: 1}).exec()

    queryReceitas.then(receitas => {
      if(receitas.length) {
        const rows = receitas.map(d => {
          return {
            titulo: imovel.titulo,
            data: d.data,
            dataVencimento: d.dataVencimento,
            valor: d.valor ? d.valor : 0,
            descricao: d.descricao ? d.descricao : '',
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

class RelatorioContasAReceberController {
  getRelatorio(req, res) {
    imovelModel.find({'proprietario': req.params.proprietarioId, 'endereco.cidade':req.params.cidadeId})
      .populate('proprietario')
      .then(imoveis => {
        let operations = []
        const dataVencimentoInicial = new Date(parseInt(req.params.dataVencimentoInicial))
        const dataVencimentoFinal = new Date(parseInt(req.params.dataVencimentoFinal))

        console.log(dataVencimentoInicial)
        console.log(dataVencimentoFinal)


        imoveis.forEach(i => {
            operations.push(getReceitas(i, dataVencimentoInicial, dataVencimentoFinal))
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

          plinio = _.sortBy(plinio, o => o.data)

          let totalAReceber = plinio.reduce((a, b) => {
            return a + b.valor
          },0)

          let totalRecebido = plinio.reduce((a, b) => {
            if(b.data) {
              return a + b.valor
            } else {
              return a
            }
          },0)

          res.json({receitas:plinio, totalAReceber, totalRecebido})
        })
      })
  }
}

module.exports = new RelatorioContasAReceberController()
