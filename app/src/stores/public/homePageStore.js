import { observable, action } from 'mobx'
import config from '../config.js'
import {getJson} from '../fetch.js'

export default class homePageStore {
  @observable imoveis = []
  @observable imovelDestaque = {
    imagens : [],
    titulo : '',
    subtitulo : '',
    descricao : ''
  }

  @action getImoveis() {
    getJson(config.url + '/imoveisEmDestaque').then(json => {
      this.imoveis = json
    })


  }
}

