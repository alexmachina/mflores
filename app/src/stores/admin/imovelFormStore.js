import {AsStructure, observable, action, toJS} from 'mobx'
import config from '../config.js'
import {putJson, getJson} from '../fetch.js'
import { hashHistory } from 'react-router'

export default class ImovelFormStore {
  @observable imovel = {
    titulo: '',
    tipo: '',
    rgi: '',
    instalacao: '',
    energia: '',
    observacaoGestor: '',
    precoVenda: null,
    precoLocacao: null,
    valorCondominio: null,
    metragem : {
      areaTotal: '',
      areaConstruida: '',
    },
    zoneamento: false,
    IPTU: '',
    valorAnualIPTU: null,
    valorParceladoIPTU: null
  }
  
  @observable buttonText = 'Salvar'
  @observable buttonStyle: { backgroundColor: 'blue'}
  @observable showDeleteModal = false

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

  @action delete(id) {
    let url = `${config.url}/imovel/${id}`

    fetch(url, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        hashHistory.push('/admin/imoveis')
        
      }
    })
  }

  @action getImovel(id) {
    getJson(config.url+'/imovel/'+id).then(
      imovel => {
        this.imovel = observable(imovel)
      })

  }
}
