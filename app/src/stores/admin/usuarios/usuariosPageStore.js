import { observable, toJS, action } from 'mobx'
import config from '../../config.js'
import { getJson } from '../../fetch.js'

export default class UsuariosPageStore {
  @observable usuarios = []
  @observable fetching = false
  @observable erro = ''
  @observable showModal = false


  @action fetchUsuarios() {
    this.fetching = true
    getJson(`${config.url}/usuarios/`)
      .then(json =>  {
        this.usuarios = json 
        this.fetching = false
      })
      .catch(err => this.erro = err)
  }

}
