import { observable, action, toJS } from 'mobx'
import config from '../../config'
import { getJson } from '../../fetch.js'

export default class RelatorioImoveisStore {
  @observable imoveis = []
  @observable activePage = 1
  @observable items = 0

  @action getImoveis() {
    getJson(config.url+'/imoveis?page=' + this.activePage).then(res => { 
      this.imoveis = res.imoveis
      this.items = Math.ceil(res.count / 10)
    }
    )


  }
}

