import { observable, action, toJS } from 'mobx'
import config from '../config.js'
import {putJson, postJson, getJson} from '../fetch.js'

export default class DespesasFormStore {
  @observable despesas = []
  @observable despesa = {
    descricao: '',
    valor: '',
    data: null
  }

  @action getDespesas(id) {
    let url = config.url + '/imovel/' + id
    getJson(url).then(imovel => {
      this.despesas = imovel.despesas
    })
  }

  @action getDespesa(id, idDespesa) {
    let url = config.url + '/imovel/' + id + '/despesa/' + idDespesa
    getJson(url).then(despesa => {
      this.despesa = despesa
    })
  }

  @action saveDespesa(id) {
    let url = config.url + '/imovel/' + id + '/despesa/'
    postJson(url, toJS(this.despesa)).then(() => {
      alert("OK")
    })
  }
}

