import {observable, action, toJS} from 'mobx'
import {putJson, getJson} from '../fetch.js'
import config from '../config.js'

export default class ProprietarioFormStore {
  @observable proprietario = {
    cpfCnpj: '',
    rgInscricao: '',
    nome: '',
    telefone: '',
    celular: '',
    email: '',
    endereco: {
      estado: '',
      cidade: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      complemento: '',
      pontoDeReferencia: ''

    }
  }

  @action getProprietario(id) {
    getJson(config.url + '/imovel/' + id).then(
      imovel => {
      this.proprietario = observable(imovel.proprietario)
      console.log(imovel)
      }
    )
    }
  @action saveProprietario(id) {
      putJson(config.url + '/imovel/' + id, {proprietario: toJS(this.proprietario)}).then(
      () => {
        alert("OK")

      })
  }
}
