import {observable,toJS, action} from 'mobx'
import {putJson, getJson} from '../fetch.js'
import config from '../config.js'


export default class EnderecoFormStore {
  @observable endereco = {
    estado: {},
    cidade: {},
    bairro: '',
    rua: '',
    numero: '',
    complemento: '',
    pontoDeReferencia: '',
    cep: ''
  }
  @observable cidades = []
  @observable estados = []

  
  @observable buttonText = 'Salvar'
  @observable buttonStyle = {}

  @action getEstados() {
    let url = `${config.url}/estados`
    getJson(url).then(estados => {
      this.estados = estados.map(e => {
        return {value: e._id, option:e.sigla}
      })
    })
  }

  @action getCidades(estadoId) {
    let url = `${config.url}/cidades/${estadoId}`
    getJson(url).then(cidades => {
      this.cidades = cidades.map(c => {
        return {value: c._id, option: c.nome}
      })
    })
  }

  @action save(id) {
    putJson(config.url + '/imovel/' + id, {endereco: toJS(this.endereco)})
      .then(() => {
        this.buttonText = 'Salvo'
        this.buttonStyle = {backgroundColor: '#7fc857', color:'white'}

        setTimeout(() => {
          this.buttonText = 'Salvar'
          this.buttonStyle= {}
        },3000)

      })
  }

  @action getEndereco(id) {
    getJson(config.url + '/imovel/' + id).then(imovel => {
      this.endereco = observable(imovel.endereco)
      getJson(`${config.url}/cidades/${imovel.endereco.estado._id}`).then(cidades => {
        this.cidades = cidades.map(c => {
          return {value: c._id, option: c.nome}
        })
      })
    })
  }
}
