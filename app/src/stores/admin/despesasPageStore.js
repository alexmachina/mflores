import { observable, action, toJS } from 'mobx'
import {putJson, getJson, postJson} from '../fetch.js'
import config from '../config.js'

export default class DespesasPageStore {
  @observable selectedDespesa = {
    _id: null,
    descricao: '',
    valor: 0,
    ano: null,
    mes: null 
  }
  @observable despesas= []
  @observable showModal = false
  @observable activePage = 1
  @observable items = 0
  @observable search = {
    ano: '',
    mes: ''
  }
  @observable totalDespesas = null

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
    getJson(url).then(despesas => {
      this.despesas = despesas,
      this.items = 0
    })
    
  }

  @action getDespesasByAnoMes(id) {
    let url = config.url + '/imovel/' + id + '/despesas/'+this.search.ano + '/' + this.search.mes
    getJson(url).then(res => {
      console.log(res)
      this.despesas = res.despesas
      this.totalDespesas = res.totalDespesas[0].count
    })
    
  }
}
