import { observable, action } from 'mobx'
import config from '../config.js'
import { getJson, postJson, putJson } from '../fetch.js'

export default class ReceitasPageStore {
  @observable selectedReceita = {
    descricao: '',
    data: '',
    valor: '',
    observacao: '',
    imovel: ''
  }

  @observable receitas = []

  @observable search = {
    dataInicial: '',
    dataFinal: ''
  }

  @observable showModal = false

  @action getReceitas(imovelId) {
    getJson(config.url + '/imovel/' + imovelId + '/receitas').then(
      receitas => this.receitas = receitas)
  }

  @action saveReceita(imovelId) {
    
    
  }
}
