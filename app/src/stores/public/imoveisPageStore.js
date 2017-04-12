import { observable, action, toJS } from 'mobx'
import config from '../config.js'
import { getJson } from '../fetch.js'

export default class ImoveisPageStore {
  @observable imoveis = []
  @observable activePage = 1
  @observable search = ''
  @observable precoVendaRange = [0, 1000]
  @observable precoLocacaoRange = [0, 100000]
  @observable items = 0
  

  @action getImoveis() {
    getJson(config.url+'/imoveis?page='+this.activePage).then(
      res => {
        this.imoveis = res.imoveis
        this.items = Math.ceil(res.count/10)
      })
  }
}

