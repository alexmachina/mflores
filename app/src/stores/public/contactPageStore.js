import { observable, toJS, action } from 'mobx'
import config from '../config.js'
import { postJson } from '../fetch.js'

export default class ContactPageStore {
  @observable contato = {
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  }

  @observable buttonText = 'Enviar'
  @observable buttonStyle = { }
  @observable sent = false
  @observable sending = false

  @action sendMessage() {
    if(!this.sent && !this.sending) {
      this.sending = true
      this.buttonText = 'Enviando...'
    postJson(config.url + '/contact/sendMessage', toJS(this.contato)).then(
      () => { 
        this.buttonText = 'Enviado com sucesso!'
        this.buttonStyle = { backgroundColor: 'green', color:'white' }
        this.sent = true
      })
    }
  }

}
