import { observable, action, toJS } from 'mobx'
import {putJson, getJson, postJson} from '../fetch.js'
import config from '../config.js'

export default class DespesasPageStore {
  @observable selectedDespesa = {
    _id: null,
    descricao: '',
    valor: 0,
    data: null,
  }
  @observable despesas= []
  @observable showModal = false
  @observable activePage = 1
  @observable items = 0
  @observable search = {
    dataInicial: '',
    dataFinal: ''
  }
  @observable totalDespesas = null

  parseComma2Dot(value) {
    value = value.replace(',','.')
    value = parseFloat(value)
    return value
  }
  @action saveDespesa(id) {
    this.selectedDespesa.valor = this.parseComma2Dot(this.selectedDespesa.valor)
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
    getJson(url).then(despesas => {
      this.despesas = despesas,
      this.items = 0
    })
    
  }

  @action getDespesasByData(id) {
    let url = config.url + '/imovel/' + id + '/despesas/'+this.search.dataInicial + '/' + this.search.dataFinal
    console.log(url)
    getJson(url).then(res => {
      this.despesas = res.despesas
      this.totalDespesas = res.totalDespesas
    })
    
  }
}
