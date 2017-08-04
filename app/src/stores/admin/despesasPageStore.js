import { observable, action, toJS } from 'mobx'
import {putJson, getJson, postJson} from '../fetch.js'
import config from '../config.js'

export default class DespesasPageStore {
  @observable selectedDespesa = {
    _id: null,
    descricao: '',
    valor: 0,
    data: null,
    dataVencimento: null,
    observacao: ''
  }
  @observable despesas= []
  @observable showModal = false
  @observable activePage = 1
  @observable items = 0
  @observable search = {
    dataInicial: '',
    dataFinal: ''
  }
  @observable isSearch = false 
  @observable idToDelete = null

  @observable totalDespesas = null
  @observable showConfirmation = false

  @action saveDespesa(id) {
    if(!this.selectedDespesa._id) {
      let url = config.url + '/imovel/' + id + '/despesa' 
      postJson(url, toJS(this.selectedDespesa)).then(() => {
        this.showModal = false
        this.getDespesas(id)
      })

    } else {
      let url = config.url + '/imovel/'+id+'/despesa/'+this.selectedDespesa._id
      putJson(url, toJS(this.selectedDespesa)).then(() => {
        this.showModal = false
        this.getDespesas(id)
      })
    }
  }

  @action getDespesas(id) {
    let url = config.url + '/imovel/' + id + '/despesas?page='+this.activePage
    getJson(url).then(response => {
      this.despesas = response.despesas
      this.totalDespesas = response.soma
      this.items = Math.ceil(response.count/10)
    })

  }

  @action getDespesasByData(id) {
    let url = config.url + '/imovel/' + id + '/despesas/'+this.search.dataInicial + '/' + this.search.dataFinal
    url += '?page=' + this.activePage
    console.log(url)
    getJson(url).then(res => {
      this.despesas = res.despesas
      this.totalDespesas = res.totalDespesas
      this.items = Math.ceil(res.count/10)

    })

  }

  @action deleteDespesa() {
    let id = this.idToDelete
    fetch(`${config.url}/despesa/${id}`, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
      }
    })
  }
}
