import { observable, toJS, action } from 'mobx'
import config from '../config.js'
import {Delete, getJson, postJson, putJson } from '../fetch.js'
import moment from 'moment'

export default class ReceitasPageStore {
  @observable selectedReceita = {
    descricao: '',
    data: '',
    dataVencimento: '',
    valor: '',
    observacao: '',
    modoPagamento: '',
    imovel: ''
  }

  @observable totalRecebido = 0
  @observable totalAReceber = 0

  @observable receitas = []
  @observable totalReceitas = null

  @observable showDeleteConfirm = false

  @observable search = {
    dataInicial: '',
    dataFinal: ''
  }

  @observable showModal = false
  @observable items = 0
  @observable activePage = 1
  @observable isSearch = false

  @action getReceitas(imovelId) {
    getJson(config.url + '/imovel/' + imovelId + '/receitas?page=' + this.activePage).then(
      response => { 
        this.receitas = response.receitas
        this.items = Math.ceil(response.count/10)
        this.totalRecebido = response.totalRecebido
        this.totalAReceber = response.totalAReceber
      })
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
  @action clearSelectedReceita() {
    this.selectedReceita = {
      descricao: '',
      data: '',
      dataVencimento: '',
      valor: '',
      observacao: '',
      modoPagamento: '',
      imovel: ''
    }
  }



@action getReceita(receitaId, imovelId) {
  getJson(config.url + '/imovel/' + imovelId + '/receita/' + receitaId).then(
    receita => {
      receita.data = moment(receita.data)
      receita.dataVencimento = moment(receita.dataVencimento)
      console.log(receita)
      this.selectedReceita = receita

    })
}

@action searchByDate(imovelId) {
  let url = config.url + '/imovel/' + imovelId + '/receitas/'
    + this.search.dataInicial + '/' + this.search.dataFinal 
    + '?page='+this.activePage
  getJson(url).then(
    response => { 
      this.receitas = response.receitas 
      this.totalReceitas = response.totalReceitas
      this.items = Math.ceil(response.count/10)
    }
  )
}

@action deleteReceita(){
  const url = `${config.url}/receita/${this.selectedReceita._id}`
  Delete(url).then(() => {
    this.showModal = false
    this.showDeleteConfirm = false
    this.getReceitas(this.props.id)

  })
}
}
