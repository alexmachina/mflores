import { observable, action, toJS } from 'mobx'
import config from '../config.js'
import { getJson } from '../fetch.js'


export default class ProprietariosImoveisStore {
  @observable nome = ''
  @observable imoveis = []
  @observable items = 0
  @observable activePage = 1
  
  @observable loaded = true
  @observable error_message = ''

  @action getImoveis(idProprietario) {
    this.loaded = false
    const url = `${config.url}/proprietario/${idProprietario}/imoveis`

    getJson(url).then(imoveis => {
      this.imoveis = imoveis
      this.loaded = true
    }).catch(err => {
      this.error_message = err
      this.loaded = true
    })
  }

  @action getNome(idProprietario) {
    this.loaded = false
    const url = `${config.url}/proprietario/${idProprietario}`
    getJson(url).then(proprietario => {
      this.nome = proprietario.nome
      this.loaded = true
    }).catch(err => {
      this.error_message = err
      this.loaded = true
    })
  }
}
