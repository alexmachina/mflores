import { observable, toJS, action } from 'mobx'
import { getJson } from '../../fetch.js'
import config from '../../config.js'

export default class RelatorioImovelStore {
  @observable imovel = { 
    endereco: {},
    proprietario: {
      endereco: {}
    }
  }

  @action getImovel(id) {
    let url = config.url + '/imovel/' + id
    getJson(url).then(imovel => this.imovel = imovel)

  }

  @action generatePdf() {
    
  }
}

