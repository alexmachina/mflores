import { getJson } from '../../../fetch.js'
import  config  from '../../../config.js'
import moment from 'moment'
import formatToReal from '../../../../components/utils/formatToReal.js'

export default class RelatorioControleAux {
  constructor() {

  }

  renderImovel (id) {
    return new Promise((resolve, reject) => {
      getJson(`${config.url}/imovel/${id}`).then(imovel => {
        const imovelNode = {
          text: imovel.titulo,
          alignment:'center',
          fontSize:22
        }

        resolve(imovelNode)
      })

    })
  }

  renderRangeData(dataInicial, dataFinal) {
    return new Promise((resolve, reject) => {
      const datasNode = {
        text:`Periodo de ${moment(dataInicial).format('DD/MM/YYYY')}  á ${moment(dataFinal).format('DD/MM/YYYY')}`,
        alignment: 'center',
        fontSize:18,
        margin:[0,20,0,20]
      }
      resolve(datasNode)
    })
  }

  _validaDatas(dataInicial, dataFinal) {
    dataInicial = moment(dataInicial)
    dataFinal = moment(dataFinal)

    if (dataFinal.isBefore(dataInicial))
      return false
    else 
      return true
  }

  renderContent(tipoRelatorio, imovelId, dataInicial, dataFinal) {
      switch(tipoRelatorio) {
        case 'Receitas':
          return this._renderReceitas(imovelId, dataInicial, dataFinal)
        case 'Despesas':
          return this._renderDespesas(imovelId, dataInicial, dataFinal)
      }
  }

  _renderDespesas(imovelId, dataInicial, dataFinal) {
    return new Promise((resolve, reject) => {
      if(!this._validaDatas(dataInicial, dataFinal)) {
        return reject('A data inicial não pode ser maior do que a data final.')
      }

      if(!dataInicial || !dataFinal)
        return reject('Preencha todos os campos')

      const url = `${config.url}/imovel/${imovelId}/despesas/${dataInicial}/${dataFinal}`
      getJson(url).then(response => {
        const pdfContent = this._buildDespesasTable(response.despesas, response.totalDespesas)

        resolve(pdfContent)
      }).catch(err =>{ 
        const pdfContent = this._buildDespesasTable([], 0)
        resolve(pdfContent)
      } )
    })
  }

  _buildDespesasTable(despesas, totalDespesas) {
    const despesasHeader = [
      {text: 'Descrição', style:'tableHeader'},
      {text: 'Valor', style:'tableHeader'},
      {text: 'Data', style: 'tableHeader'},
      {text: 'Observação', style: 'tableHeader'},
    ]
    let despesasBody = []

    if(!despesas.length) {
      return [
        {
          style:'tablePrincipal',
          table: {
            widths: ['auto', 'auto', 'auto', '*'],
            body:[despesasHeader]
          }
        }
      ]
    }
    despesasBody = despesas.map(despesa => 
      [despesa.descricao, formatToReal(despesa.valor), moment(despesa.data).format('DD/MM/YYYY'),
        despesa.observacao ? despesa.observacao : ""])

    const tableContent = [despesasHeader, ...despesasBody]
    const despesasTable = [
      {
        style:'tablePrincipal',
        table: {
          widths: ['auto', 'auto', 'auto', '*'],
          body:tableContent
        }
      },
      { style:'total',
        text: 'Total de Despesas: ' + formatToReal(-totalDespesas)
      }
    ]

    return despesasTable

  }

  _renderReceitas(imovelId, dataInicial, dataFinal) {
    return new Promise((resolve, reject) => {
      if(!this._validaDatas(dataInicial, dataFinal)) {
        return reject('A data inicial não pode ser maior do que a data final.') 
      }

      if(!dataInicial || !dataFinal)
        return reject('Preencha todos os campos')

      const url = `${config.url}/imovel/${imovelId}/receitas/${dataInicial}/${dataFinal}`
      getJson(url).then(response => {
        const pdfContent = this._buildReceitasTable(response.receitas, response.totalReceitas)
        resolve(pdfContent)
      }).catch(error => {
        const pdfContent = this._buildReceitasTable([], 0)
        resolve(pdfContent)
      })
    })
  }

  _buildReceitasTable(receitas, totalReceitas) {
    const receitasHeader = [
      {text: 'Descrição', style:'tableHeader'},
      {text: 'Valor', style:'tableHeader'},
      {text: 'Data', style: 'tableHeader'},
      {text: 'Pagamento', style: 'tableHeader'},
      {text: 'Observacao', style: 'tableHeader'},
    ]
    let receitasBody = []

    if(!receitas.length) {
      return {
        style:'tablePrincipal',
        table: {
          widths: ['auto',75,'auto','auto','*'],
          body: [receitasHeader]
        }
      }
    }

    receitasBody = receitas.map(receita => 
      [receita.descricao, formatToReal(receita.valor), moment(receita.data).format('DD/MM/YYYY'), 
        receita.modoPagamento, receita.observacao])

    const tableContent = [receitasHeader, ...receitasBody,]

    const receitasTable = [
      {
        style: 'tablePrincipal',
        table: {
          widths:['auto',75,'auto','auto','*'],
          body: tableContent,
        }
      },
      { style:'total',
        text: 'Total de Receitas: '+formatToReal(totalReceitas)
      }
    ]

    console.log(receitasTable)
    return receitasTable

  }
}
