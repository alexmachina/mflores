const proprietarioModel = require('../../models/proprietarioModel')
const imovelModel = require('../../models/imovelModel')
const receitaModel = require('../../models/receitaModel')
const ObjectId = require('mongoose').Types.ObjectId
const _ = require('underscore')

function getReceitas(imovel,dataRecebimentoInicial, dataRecebimentoFinal) {
  return new Promise((resolve, reject) => {
    let query = {data:{$gte: dataRecebimentoInicial, $lte: dataRecebimentoFinal},
      imovel: new ObjectId(imovel._id)
    }
    let queryReceitas = receitaModel.find(query).sort({data: 1}).exec()

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
        const dataRecebimentoInicial = new Date(parseInt(req.params.dataRecebimentoInicial))
        const dataRecebimentoFinal = new Date(parseInt(req.params.dataRecebimentoFinal))


        imoveis.forEach(i => {
            operations.push(getReceitas(i, dataRecebimentoInicial, dataRecebimentoFinal))
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

          let total = plinio.reduce((a, b) => {
            return a + b.valor
          },0)

          res.json({receitas:plinio, total})
        })
      })
  }
}

module.exports = new RelatorioContasAReceberController()
