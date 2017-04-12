import {observable, toJS, action} from 'mobx'
import {getJson, putJson} from '../fetch.js'
import config from '../config.js'
import moment from 'moment'
moment.locale('br')

export default class LocatarioStore {
  @observable locatario = {
    cpfCnpj: '',
    nome: '',
    rgInscricao: '',
    responsavel: '',
    telefone: '',
    celular: '',
    email: '',
    dataInicioContrato: '',
    dataFimContrato: '',
    valor: '',
    seguro: false,
    dataVencimentoSeguro: '',
    garantia: '',
    descricaoGarantia: '',
    dataInicioValidadeGarantia: '',
    dataFimValidadeGarantia:'' 
  }

  @observable buttonText = "Salvar"
  @observable buttonStyle = {}

  @action getLocatario(id) {
    getJson(config.url + '/imovel/' + id).then(imovel => {
    
      imovel.locatario.dataInicioContrato =
        imovel.locatario.dataInicioContrato ? 
        moment(imovel.locatario.dataInicioContrato) : ''

      imovel.locatario.dataFimContrato = 
        imovel.locatario.dataFimContrato ? 
        moment(imovel.locatario.dataFimContrato) : ''

      imovel.locatario.dataVencimentoSeguro =  
        imovel.locatario.dataVencimentoSeguro ? 
        moment(imovel.locatario.dataVencimentoSeguro) : ''

      imovel.locatario.dataInicioValidadeGarantia = 
        imovel.locatario.dataInicioValidadeGarantia ? 
        moment(imovel.locatario.dataInicioValidadeGarantia) : '' 

      imovel.locatario.dataFimValidadeGarantia = 
        imovel.locatario.dataFimValidadeGarantia ?
        moment(imovel.locatario.dataFimValidadeGarantia) : ''

      this.locatario = observable(imovel.locatario)
    })
  }

  @action saveLocatario(id) {
    putJson(config.url + '/imovel/' + id, {locatario: this.locatario}).then(() => {
      this.buttonText = 'Salvo com sucesso'
      this.buttonStyle= {backgroundColor: '#7fc857', color: 'white'}

      setTimeout(() => {
        this.buttonText = 'Salvar'
        this.buttonStyle = {}
      }, 3000)
    })
  }
}
