import {AsStructure, observable, action, toJS} from 'mobx'
import config from '../config.js'
import {putJson, getJson} from '../fetch.js'


export default class ImovelFormStore {
  @observable imovel = {
    titulo: '',
    tipo: '',
    rgi: '',
    instalacao: '',
    observacaoGestor: '',
    observacaoWebsite: '',
    disponivelWebsite: false,
    metragem : {
      areaTotal: '',
      areaConstruida: '',
      capacidade: ''
    },
    zoneamento: false
  }

  @action save(id) {
    putJson(config.url + '/imovel/'+id,
      toJS(this.imovel)).then(() => {
        alert('OK')
      })
  }

  @action getImovel(id) {
    getJson(config.url+'/imovel/'+id).then(
      imovel => {
        this.imovel = observable(imovel)
      })

  }
}
