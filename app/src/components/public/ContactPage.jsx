import React from 'react'
import Input from '../utils/Input.jsx'
import { Button } from 'react-bootstrap'
import ContactPageStore from '../../stores/public/contactPageStore.js'
import { observer } from 'mobx-react'

@observer
export default class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ContactPageStore()
  }
  render() {
    return (
      <div className="container">
      <div className="container">
        <header className="row cima">
          <header className="col-md-12">
            <a href="index.html" title="atalho para a home"><img  src="/img/tb_logo.png" width="320" alt="Logo Miria Flores" className="img-responsive pull-left img-home" /></a>
          </header>
        </header>
      </div>

      <article className="col-md-12">

        <div className="col-md-6">
          <h1 className="tituloh1">Contato:</h1>
          <h4>Rua Professor Valdecir Campestre, 364, sala 1.</h4>
          <h4>Centro - Vargem Grande Paulista.</h4>
          <h4>Cep: 06730-000</h4>
          <h4>Telefones: 11 41592625 | 11 7703 4683  |  11 956399063</h4>
          <h4>Email: miriaflores@creci.org.br | rbb.adm@gmail.com </h4>
        </div>

        <form onSubmit={this.onSubmit.bind(this)} className="col-md-6">
          <Input label="Nome"
            value={this.store.contato.nome}
            onChange={this.onNomeChange.bind(this)}
            placeholder="Digite aqui seu nome"
          />
          <Input label="Email"
            value={this.store.contato.email}
            onChange={this.onEmailChange.bind(this)}
            placeholder="Digite aqui seu e-mail"
          />
          <label>Mensagem</label>
          <textarea 
            className="form-control contraste" 
            rows="5" 
            placeholder="Digite aqui sua mensagem"
            onChange={this.onMensagemChange.bind(this)}
          >
          </textarea>

          <Button className="save-button" style={this.store.buttonStyle} type="submit">
            {this.store.buttonText}
          </Button>
          <p></p>
        </form>

      </article>
    </div>
    )
    }

    onSubmit(e) {
      e.preventDefault()
      this.store.sendMessage()
    }

  onNomeChange(e) {
    this.store.contato.nome = e.target.value
  }
  onEmailChange(e) {
    this.store.contato.email = e.target.value
  }
  onMensagemChange(e) {
    this.store.contato.mensagem = e.target.value
  }
}
