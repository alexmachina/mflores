import {observable, action} from 'mobx'
import config from '../../../config.js'
import { getJson } from '../../../fetch.js'
import { renderHeader, renderFooter, styles } from '../functions.js'
import moment from 'moment'
import formatToReal from '../../../../components/utils/formatToReal.js'

export default class RelatorioContasAPagarStore {
  @observable proprietarios = []
  @observable proprietario = null
  @observable dataRecebimentoInicial = null
  @observable dataRecebimentoFinal = null
  @observable cidades = []
  @observable cidade = null
  @observable nomeCidade = ''
  @observable nomeProprietario = ''
  @observable nomeEstado = ''
  @observable estados = []
  @observable estado = null


  @action getEstados() {
    const url = `${config.url}/estados`
    getJson(url).then(estados => {
      this.estados = estados.map(e => {
        return {option:e.sigla, value: e._id}
      })
    })
  }

  @action getCidades(estado) {
    const url = `${config.url}/cidades/${estado}`
    getJson(url).then(cidades => {
      this.cidades = cidades.map(c => {
        return {option:c.nome, value:c._id}
      })
    })
  }

  @action getProprietarios() {
    const url = `${config.url}/proprietarios`
    getJson(url).then(proprietarios => {
      this.proprietarios = proprietarios.map(p => {
        return {option: p.nome, value: p._id}
      })
    })
  }

  @action generatePdf() {
    let operations = [ renderHeader(), renderFooter(), this.getRelatorioContasAPagar() ]
    Promise.all(operations).then(results => {
      console.log('operations processed')
      let [ header, footer, table ] = results

      let content = [
        {text: 'Contas á Pagar', style:'texto'},
        {text: `Período de: ${moment(this.dataVencimentoInicial).format('DD/MM/YYYY')} á ${moment(this.dataVencimentoFinal).format('DD/MM/YYYY')}`,
          style:'texto'},
        {text: `Proprietário: ${this.nomeProprietario}`,style: 'texto'},
        {text: `Cidade: ${this.nomeCidade}`, style: 'texto'},
        table
      ]
      const doc = {
        pageMargins:[0,150,0,150],
        header,
        footer,
        content,
        styles
      }

      console.log(table)
      pdfMake.createPdf(doc).open()


    })

  }
  @action getRelatorioContasAPagar() {
    return new Promise((resolve, reject) => {
      let url =
          `${config.url}/imoveis/relatorios/contas-a-pagar/${this.proprietario}/${this.dataRecebimentoInicial}/${this.dataRecebimentoFinal}/${this.cidade}`

      getJson(url).then(results => {

        let tableHeader = [
          {text: 'Imóvel', style: 'tableHeader'},
          {text: 'Vencimento', style:'tableHeader'},
          {text: 'Pagamento', style: 'tableHeader'},
          {text: 'Valor', style:'tableHeader'},
          {text: 'Observação', style: 'tableHeader'}
        ]

        let tableBody = []
        console.log(results.despesas)
        tableBody = results.despesas.map(r => [
          r.titulo,
          r.dataVencimento ? moment(r.dataVencimento).format('DD/MM/YYYY') : '',
          r.dataPagamento ? moment(r.dataPagamento).format('DD/MM/YYYY') : '',
          formatToReal(r.valor),
          r.observacao
        ])

        let tableContent = [tableHeader, ...tableBody]

        let table = [{
          style: 'tablePrincipal',
          table: {

            widths: ['*',60,60,75,'*'],
            body: tableContent
          }
        }, {text: `Total: ${formatToReal(results.total)}`, style:'texto'}]

        resolve(table)


      }).catch(error => reject(error))

    })
  }


}
