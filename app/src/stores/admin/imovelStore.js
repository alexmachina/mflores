import {observable, action} from 'mobx'
import config from '../config.js'
import {getJson} from '../fetch.js'

export default class ImovelStore {
  @observable imovel = { 
    titulo: '',
    valor: 0,
    
  }
  @observable tabIndex = 1

  @action getImovel(id) {
    let url = config.url+'/imovel/'+id
    getJson(url).then(imovel =>{ 
      this.imovel = imovel
    }
    )
  }
}
