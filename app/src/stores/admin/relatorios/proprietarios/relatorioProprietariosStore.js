import { observable, action } from 'mobx'
import config from '../../../config.js'
import { getJson } from '../../../fetch.js'
import pdfMake from 'pdfmake/build/pdfmake.min.js'
import { renderHeader, renderFooter, styles } from '../functions.js'
import moment from 'moment'



export default class RelatorioProprietarioStore {
  @observable dataInicial = moment('01/01/2017')
  @observable dataFinal = moment('01/07/2017')
  @observable proprietarios = []
  @observable selectedProprietario = ''
  @observable selectedEstado = null
  @observable selectedCidade = null
  @observable estados = []
  @observable cidades = []
  @observable error_message = ''
  @observable nomeProprietario = ''

  @action getProprietarios() {
    let url = `${config.url}/proprietarios`
    getJson(url).then(proprietarios => {
      this.proprietarios = proprietarios.map(p => {
        this.getEstados()
        return {value: p._id, option:p.nome}

      })
    })
  }

  @action getEstados() {
    let url = `${config.url}/estados`
    getJson(url).then(estados => {
      this.estados = estados.map(e => {
        return {option: e.sigla, value: e._id}
      })
    })
  }

  @action getCidades(estadoId) {
    let url = `${config.url}/cidades/${estadoId}`
    getJson(url).then(cidades => {
      this.cidades = cidades.map(c => {
        return {option: c.nome, value:c._id}
      })
    })
  }

  @action generatePdf() {
    let operations = [ renderHeader(), renderFooter(), this.getRelatorioProprietarios() ]
    Promise.all(operations).then(results => {
      let [ header, footer, table ] = results

      let content = [
        {text: `Período de: ${moment(this.dataInicial).format('DD/MM/YYYY')} á ${moment(this.dataFinal).format('DD/MM/YYYY')}`,
          alignment: 'center'},
        {text: `Proprietário: ${this.nomeProprietario}`, alignment: 'center'},
        {text: `Cidade: ${this.selectedCidade}`, alignment: 'center'},
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
  @action getRelatorioProprietarios() {
    return new Promise((resolve, reject) => {
      let url = 
        `${config.url}/imoveis/relatorios/proprietarios/${this.selectedProprietario}/${this.dataInicial}/${this.dataFinal}/${this.selectedCidade}`
      getJson(url).then(results => {
        let tableHeader = [
          {text: 'titulo', style: 'tableHeader'},
          {text: 'disponível', style:'tableHeader'},
          {text: 'receitas', style:'tableHeader'},
          {text: 'despesas', style: 'tableHeader'}
        ]

        let tableBody = []
        tableBody = results.map(r => [
          r.titulo, r.disponivel, r.totalReceitas, r.totalDespesas
        ])

        console.log(tableBody)

        let tableContent = [tableHeader, ...tableBody]

        let table = {
          style: 'tablePrincipal',
          table: {
            body: tableContent
          }
        }

        resolve(table)


      }).catch(error => reject(error))

    })
  }


}
