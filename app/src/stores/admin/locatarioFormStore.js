import {observable, toJS, action} from 'mobx'
import {getJson, putJson} from '../fetch.js'
import config from '../config.js'
import moment from 'moment'
moment.locale('br')

export default class LocatarioStore {
  @observable locatario = {
    cpfCnpj: '',
    rgInscricao: '',
    responsavel: '',
    telefone: '',
    celular: '',
    email: '',
    dataInicioContrato: '',
    dataFimContrato: '',
    valor: 0,
    seguro: false,
    dataVencimentoSeguro: ''
  }

  @action getLocatario(id) {
    getJson(config.url + '/imovel/' + id).then(imovel => {
      imovel.locatario.dataInicioContrato = moment(imovel.locatario.dataInicioContrato)
      imovel.locatario.dataFimContrato = moment(imovel.locatario.dataFimContrato)
      imovel.locatario.dataVencimentoSeguro = moment(imovel.locatario.dataVencimentoSeguro)
      this.locatario = observable(imovel.locatario)
    })
  }

  @action saveLocatario(id) {
    putJson(config.url + '/imovel/' + id, {locatario: this.locatario}).then(() => {
      alert('OK')
    })
  }
}
