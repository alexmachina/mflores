import { observable, action } from 'mobx'
import { getJson } from '../../../fetch.js'
import config from '../../../config.js'
import pdfmake from 'pdfmake/build/pdfmake.min.js'
import { renderHeader, renderFooter, styles } from '../functions.js'
import RelatorioLocacaoAux from './relatorioLocacaoAux.js'

export default class relatorioLocacaoStore {
  constructor() {
    this.aux = new RelatorioLocacaoAux()
  }

  @observable imoveiId = null
  @observable dataInicial = null
  @observable dataFinal = null
  @observable showModal = false
  @observable erro = ''

  @action generatePdf() {
    const operations = [renderHeader(),
      renderFooter(), this.aux.renderLocacao(this.imovelId), 
      this.aux.renderDespesas(this.imovelId, this.dataInicial, this.dataFinal),
      this.aux.renderReceitas(this.imovelId, this.dataInicial, this.dataFinal),
      this.aux.renderImovel(this.imovelId),
      ]

    Promise.all(operations).then(results => {
      const [header, footer, locacao, despesas, receitas, imovel] = results
      const content = 
        [ imovel,
          locacao,
          {text: 'Receitas', style:'header'},
          receitas,
          {text: 'Despesas', style: 'header'},
          despesas,
        
        ]

      const doc = {
        pageMargins:[0,150,0,130],
        header,
        footer,
        content,
        styles
      }

      console.log(content)
      pdfMake.createPdf(doc).open()



    }).catch(err => this.erro = err)
  }
}
