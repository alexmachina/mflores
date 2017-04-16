import { observable, action, toJS } from 'mobx'
import config from '../config.js'
import { getJson } from '../fetch.js'

export default class ImoveisPageStore {
  @observable imoveis = []
  @observable activePage = 1
  @observable search = ''
  @observable precoVendaDe = 0
  @observable precoVendaAte = 100000
  @observable precoLocacaoDe = 0
  @observable precoLocacaoAte = 100000
  @observable items = 0
  

  @action getImoveis(by) {
    let url = '';

    switch (by) {
      case 'search':
      url = config.url+'/searchImoveis/'+this.search+'?page='+this.activePage
        break
      case 'precoVenda':
        url = config.url+'/buscarImoveisPorPrecoDeVenda/'+this.precoVendaDe+'/'+this.precoVendaAte
        break
      case 'precoLocacao':
        url = config.url +'/buscarImoveisPorPrecoDeLocacao/'+this.precoLocacaoDe+'/'+this.precoLocacaoAte
        break
      default:
        url = config.url + '/buscarImoveisDisponiveis?page=' + this.activePage
        break
    }

    getJson(url).then(
      res => {
        this.imoveis = res.imoveis
        this.items = Math.ceil(res.count/10)
      })
  }
}

