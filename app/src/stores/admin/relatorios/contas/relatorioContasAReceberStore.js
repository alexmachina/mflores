import {observable, action} from 'mobx'
import config from '../../../config.js'
import { getJson } from '../../../fetch.js'
import { renderHeader, renderFooter, styles } from '../functions.js'
import moment from 'moment'
import formatToReal from '../../../../components/utils/formatToReal.js'

export default class RelatorioContasAReceberStore {
  @observable proprietarios = []
  @observable proprietario = null
  @observable dataPagamentoInicial = null
  @observable dataPagamentoFinal = null
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
    let operations = [ renderHeader(), renderFooter(), this.getRelatorioContasAReceber() ]
    Promise.all(operations).then(results => {
      console.log('operations processed')
      let [ header, footer, table ] = results

      let content = [
        {text: 'Contas á Receber', style:'texto'},
        {text: `Período de: ${moment(this.dataPagamentoInicial).format('DD/MM/YYYY')} á ${moment(this.dataPagamentoFinal).format('DD/MM/YYYY')}`,
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
  @action getRelatorioContasAReceber() {
    return new Promise((resolve, reject) => {
      let url =
        `${config.url}/imoveis/relatorios/contas-a-receber/${this.proprietario}/${this.dataPagamentoInicial}/${this.dataPagamentoFinal}/${this.cidade}`
      console.log('fetching report... ')
      getJson(url).then(results => {
        console.log('report fetched')
        let tableHeader = [
          {text: 'Imóvel', style: 'tableHeader'},
          {text: 'Data de Recebimento', style:'tableHeader'},
          {text: 'Data de Vencimento', style:'tableHeader'},
          {text: 'Valor', style:'tableHeader'},
          {text: 'Descrição', style: 'tableHeader'},
          {text: 'Observação', style: 'tableHeader'}
        ]

        let tableBody = []
        tableBody = results.receitas.map(r => [
          r.titulo, r.data ? moment(r.data).format('DD/MM/YYYY') : '',
          r.dataPagamento ? moment(r.dataPagamento).format('DD/MM/YYYY') : '',
          formatToReal(r.valor), r.descricao,
          r.observacao
        ])

        let tableContent = [tableHeader, ...tableBody]

        let table = [{
          style: 'tablePrincipal',
          table: {
            widths: ['*',60,60,'*','auto','*'],
            body: tableContent
          }
        }, {text:
          `Total a Receber: ${formatToReal(results.totalAReceber)} | Total Recebido: ${formatToReal(results.totalRecebido)}`, style:'texto'}]

        resolve(table)


      }).catch(error => reject(error))

    })
  }


}
