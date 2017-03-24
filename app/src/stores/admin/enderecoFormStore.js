import {observable,toJS, action} from 'mobx'
import {putJson, getJson} from '../fetch.js'
import config from '../config.js'


export default class EnderecoFormStore {
  @observable endereco = {
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: '',
    pontoDeReferencia: '',
    cep: ''
  }

  @action save(id) {
    putJson(config.url + '/imovel/' + id, {endereco: toJS(this.endereco)})
      .then(() => {
        alert("OK")
      })
  }

  @action getEndereco(id) {
    getJson(config.url + '/imovel/' + id).then(imovel => {
      this.endereco = observable(imovel.endereco)
      console.log(this.endereco)
    })
  }
}
