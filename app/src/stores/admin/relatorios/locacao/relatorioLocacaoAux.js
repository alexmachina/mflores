import config from '../../../config.js'
import { getJson } from '../../../fetch.js'
import moment from 'moment'
import RelatorioControleAux from '../controle/relatorioControleAux.js'
import formatToReal from '../../../../components/utils/formatToReal.js'
export default class RelatorioLocacaoAux {

  constructor() {
    this.RelatorioControleAux = new RelatorioControleAux()
  }
  renderLocacao(imovelId) {
    return new Promise((resolve, reject) => {
      getJson(`${config.url}/imovel/${imovelId}`).then(imovel => {
        resolve(this._buildLocacao(imovel))
      })
    })
  }

  _buildLocacao(imovel) {
    let dataInicio = imovel.locatario.dataInicioContrato ?
      moment(imovel.locatario.dataInicioContrato).format('DD/MM/YYYY') : null

    let dataFim = imovel.locatario.dataFimContrato ?
      moment(imovel.locatario.dataFimContrato).format('DD/MM/YYYY') : null

    return {
      style:'tablePrincipal',
      table: { 
        widths: ['auto','*'],
        body: [
          ['Proprietário',imovel.proprietario.nome ? imovel.proprietario.nome : ''],
          ['Locatário', imovel.locatario.nome ? imovel.locatario.nome : ''],
          ['Responsável', imovel.locatario.responsavel ? imovel.locatario.responsavel : ''],
          ['Data de Início do contrato', dataInicio ? dataInicio : ''],
          ['Data de fim do contrato',dataFim ? dataFim : ''],
          ['Garantia', imovel.locatario.garantia ? imovel.locatario.garantia : ''],
          ['Valor do Aluguel',imovel.locatario.valor ? formatToReal(imovel.locatario.valor) : ''],
          ['Índice de Reajuste', imovel.locatario.indiceDeReajuste ? imovel.locatario.indiceDeReajuste : '']
        ]
      }
    }
  }

  renderDespesas(imovelId, dataInicial, dataFinal) {
    return this.RelatorioControleAux.renderContent('Despesas', imovelId, dataInicial, dataFinal)
  }

  renderReceitas(imovelId, dataInicial, dataFinal) {
    return this.RelatorioControleAux.renderContent('Receitas', imovelId, dataInicial, dataFinal)
  }

  renderImovel(imovelId) {
    return this.RelatorioControleAux.renderImovel(imovelId)
  }


}
