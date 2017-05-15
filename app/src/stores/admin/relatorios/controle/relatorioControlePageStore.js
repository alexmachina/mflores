import { observable, action } from 'mobx'
import config from '../../../config.js'
import pdfmake from 'pdfmake/build/pdfmake.min.js'
import vfs_fonts from 'pdfmake/build/vfs_fonts.js'
import { renderHeader, renderFooter, styles } from '../functions.js'
import { renderDespesas, renderReceitas } from './relatorioControleAux.js'
import RelatorioControleAux from './relatorioControleAux.js'

export default class relatorioControlePageStore {

  @observable showReceitaDespesaModal = false
  @observable showParamsModal = false
  @observable dataInicial = ''
  @observable dataFinal = ''
  @observable tipoSelecionado = ''
  @observable imovelId = null
  @observable erro = ''

  constructor() {
    this.aux = new RelatorioControleAux()
  }
  
  @action gerarRelatorio() {
    const tipoRelatorioNode = {
      text:this.tipoSelecionado,
      alignment: 'center',
      fontSize: 22,
      margin:[0,20,0,0]
    }

    const operations = [
      renderHeader(),
      renderFooter(),
      this.aux.renderImovel(this.imovelId),
      this.aux.renderRangeData(this.dataInicial, this.dataFinal),
      this.aux.renderContent(this.tipoSelecionado, this.imovelId, this.dataInicial, this.dataFinal)
    ]

    Promise.all(operations).then(results => {
      const [
        header, footer,imovelNode,
        datasNode,content ] = results
      const doc = {
        pageMargins:[0,150,0,130],
        header,
        footer,
        content: [imovelNode, tipoRelatorioNode, datasNode, content ],
        styles: styles
      }

      pdfMake.createPdf(doc).open()
    }).catch(err => this.erro = err)
  }
}
