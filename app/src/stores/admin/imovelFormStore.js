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
    capacidadeInstalada: '',
    capacidadeDisponivel: '',
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
  @observable loaded = true
  @observable proprietariosArr = []
  @observable buttonText = 'Salvar'
  @observable buttonStyle: { backgroundColor: 'blue'}
  @observable showDeleteModal = false
  @observable error_message = ''

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
    this.loaded = false
    getJson(config.url+'/imovel/'+id).then(
      imovel => {
        this.imovel = observable(imovel)
        this.loaded = true
      })

  }

  @action getProprietarios() {
    this.loaded = false
    const url = `${config.url}/proprietarios`
    getJson(url).then(proprietarios => {
      this.proprietariosArr = 
        proprietarios.map((p) => { 
          return {
            value: p._id,
            option: p.nome 
          }
        })
      this.loaded = true
    }).catch(err => {
      this.error_message = err
      this.loaded = true
    })
  }
}
