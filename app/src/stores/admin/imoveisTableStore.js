import { observable, action } from 'mobx'
import { getJson } from '../fetch.js'
import config from '../config.js'

export default class ImoveisTableStore {
  @observable imoveis = []

  @observable items = 0
  @observable activePage = 1

  @observable search = ''
  @observable isSearch = false


  @action fetchImoveis() {
    getJson(`${config.url}/imoveis?page=${this.activePage}`)
      .then(res => {
        this.imoveis = res.imoveis
        this.items = Math.ceil(res.count/10)
      })
  }

  @action performSearch() {
    getJson(`${config.url}/imoveis?page=${this.activePage}&search=${this.search}`)
      .then(res => {
        this.imoveis = res.imoveis
        this.items = Math.ceil(res.count/10)
      })
  }

}
