import { observable, action, toJS } from 'mobx'
import { postJson, getJson } from '../fetch.js'
import config from '../config.js'
import { hashHistory } from 'react-router'

export default class ImoveisStore {
  @observable imoveis = []
  @observable titulo = ''
  @observable message = ''
  @observable activePage = 1
  @observable items = 0
  @observable search = ''

  @action saveImovel() {
    postJson(config.url + '/imovel', {titulo: this.titulo})
      .then((id) => {
        hashHistory.push('/admin/imovel/'+ id.replace('"','').replace('"',''))
      }).catch(err => this.message = err)
  }
  @action getImoveis() {
    getJson(config.url + '/imoveis?page=' + this.activePage + '&search=' + this.search).then(res => {
      this.imoveis = res.imoveis
        console.log(toJS(this.imoveis))
      this.items = Math.ceil(res.count /10)
    })
  }

}
