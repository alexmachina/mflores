import { observable, toJS, action } from 'mobx'
import config from '../config.js'
import { getJson, postJson, putJson } from '../fetch.js'
import moment from 'moment'

export default class ReceitasPageStore {
  @observable selectedReceita = {
    descricao: '',
    data: '',
    valor: '',
    observacao: '',
    imovel: ''
  }

  @observable receitas = []
  @observable totalReceitas = null

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
    this.selectedReceita.imovel = imovelId
    if(this.selectedReceita._id) {
      putJson(config.url+'/imovel/'+imovelId+'/receita/'+this.selectedReceita._id, this.selectedReceita).then(() =>{
        this.getReceitas(imovelId)
        this.showModal = false
      })
    } else {
      postJson(config.url+'/imovel/'+imovelId+'/receita', toJS(this.selectedReceita)).then(() => {
        this.getReceitas(imovelId)
        this.showModal = false
      })
    }
    
  }

  @action getReceita(receitaId, imovelId) {
    getJson(config.url + '/imovel/' + imovelId + '/receita/' + receitaId).then(
      receita => {
        receita.data = moment(receita.data)
        this.selectedReceita = receita
      })
  }

  @action searchByDate(imovelId) {
    let url = config.url + '/imovel/' + imovelId + '/receitas/'
      + this.search.dataInicial + '/' + this.search.dataFinal
    getJson(url).then(
      response => { 
        this.receitas = response.receitas 
        this.totalReceitas = response.count
      }
    )
  }
}
