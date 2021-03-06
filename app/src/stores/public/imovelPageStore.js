import { observable, action } from 'mobx'
import { getJson } from '../fetch.js'
import config from '../config.js'

export default class ImovelPageStore {
  @observable imovel = {
    website: {
      titulo: ''
    },
    imagens: [],
    endereco: {
      bairro: '',
      cidade: '',
      rua: '',
      numero: '',
      pontoDeReferencia: '',
      complemento: '',

    }

  }

  @action getImovel(idImovel) {
    let url = `${config.url}/imovel/${idImovel}`

    getJson(url).then(imovel => {
      this.imovel = imovel
    })
  }
}
