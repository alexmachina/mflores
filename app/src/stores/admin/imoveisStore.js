import { observable, action } from 'mobx'
import { postJson, getJson } from '../fetch.js'
import config from '../config.js'
import { hashHistory } from 'react-router'

export default class ImoveisStore {
  @observable imoveis = []
  @observable titulo = ''
  @observable message = ''

  @action saveImovel() {
    postJson(config.url + '/imovel', {titulo: this.titulo})
      .then((id) => {
        hashHistory.push('/admin/imovel/'+ id.replace('"','').replace('"',''))
      }).catch(err => this.message = err)
  }
  @action getImoveis() {
    getJson(config.url + '/imoveis').then(imoveis => {
      this.imoveis = imoveis
    })
  }
}
