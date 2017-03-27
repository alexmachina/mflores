import { observable, action, toJS } from 'mobx'
import {putJson, getJson, postJson} from '../fetch.js'
import config from '../config.js'

export default class DespesasPageStore {
  @observable selectedDespesa = {
    _id: null,
    descricao: '',
    valor: 0,
    data: ''}
  @observable despesas= []
  @observable showModal = false
  @observable activePage = 1
  @observable items = 0

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
    getJson(url).then(res => {
      this.despesas = res.despesas,
      this.items = Math.ceil(res.count / 10)
    })
    
  }
}
