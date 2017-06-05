import config from '../../config.js'
import { getJson } from '../../fetch.js'
import { observable, action } from 'mobx'

export default class ImovelHeaderStore {
  @observable titulo


  @action
  getTitulo (id) {
    const url = `${config.url}/imovel/${id}/titulo`
    console.log(url)

    getJson(url).then(imovel => this.titulo = imovel.titulo)

  }
}
