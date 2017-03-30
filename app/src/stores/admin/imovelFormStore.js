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
    destaqueWebsite: false,
    principalWebsite: false,
    subtituloWebsite: '',
    metragem : {
      areaTotal: '',
      areaConstruida: '',
      capacidade: ''
    },
    zoneamento: false,
  }
  
  @observable buttonText = 'Salvar'
  @observable buttonStyle: { backgroundColor: 'blue'}

  @action save(id) {
    this.buttonText = 'Salvando...'
    putJson(config.url + '/imovel/'+id,
      toJS(this.imovel)).then(() => {
        this.buttonText = 'Salvo!'
        this.buttonStyle = {backgroundColor: '#7fc857', color:'white'}
        setTimeout(() => {
          this.buttonStyle = {backgroundColor: '#005e9e', color: 'white'}
          this.buttonText = "Salvar"
        }, 3000)
      })
  }

  @action getImovel(id) {
    getJson(config.url+'/imovel/'+id).then(
      imovel => {
        this.imovel = observable(imovel)
      })

  }
}
