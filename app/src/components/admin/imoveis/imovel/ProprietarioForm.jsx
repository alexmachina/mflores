import React from 'react'
import Input from '../../../utils/Input.jsx'
import ProprietarioFormStore from '../../../../stores/admin/proprietarioFormStore.js'
import {Row, Col, Button} from 'react-bootstrap'
import { observer } from 'mobx-react'

@observer
export default class ProprietarioForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ProprietarioFormStore()
  }
  componentDidMount() {
    this.store.getProprietario(this.props.id)
  }
  render() {
    return(
      <div className="container-fluid">
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Input label="CPF/CNPJ"
                value={this.store.proprietario.cpfCnpj}
                onChange={this.onCpfCnpjChange.bind(this)}
              />
              <Input label="RG/Inscrição"
                value={this.store.proprietario.rgInscricao}
                onChange={this.onRgInscricaoChange.bind(this)}
              />
              <Input label="Nome"
                value={this.store.proprietario.nome}
                onChange={this.onNomeChange.bind(this)}
              />
              <Input label="Telefone"
                value={this.store.proprietario.telefone}
                onChange={this.onTelefoneChange.bind(this)}
              />
              <Input label="Celular"
                value={this.store.proprietario.celular}
                onChange={this.onCelularChange.bind(this)}
              />
              <Input label="Email"
                value={this.store.proprietario.email}
                onChange={this.onEmailChange.bind(this)}
              />
              <Input label="Estado"
                value={this.store.proprietario.endereco.estado}
                onChange={this.onEstadoChange.bind(this)}
              />
              <Input label="Cidade"
                value={this.store.proprietario.endereco.cidade}
                onChange={this.onCidadeChange.bind(this)}
              />
              <Input label="Bairro"
                value={this.store.proprietario.endereco.bairro}
                onChange={this.onBairroChange.bind(this)}
              />
              <Input label="CEP"
                value={this.store.proprietario.endereco.cep}
                onChange={this.onCepChange.bind(this)}
              />
              <Input label="Rua"
                value={this.store.proprietario.endereco.rua}
                onChange={this.onRuaChange.bind(this)}
                 />
              <Input label="Numero"
                value={this.store.proprietario.endereco.numero}
                onChange={this.onNumeroChange.bind(this)}
              />
              <Input label="Complemento"
                value={this.store.proprietario.endereco.complemento}
                onChange={this.onComplementoChange.bind(this)}
              />
              <Input label="Ponto de Referência"
                value={this.store.proprietario.endereco.pontoDeReferencia}
                onChange={this.onPontoDeReferenciaChange.bind(this)}
              />

            <Button type="submit" style={this.store.buttonStyle} className="save-button">
              {this.store.buttonText}
            </Button>
            </form>
          </Col>
        </Row>
      </div>
    )

  }
  onSubmit(e) {
    e.preventDefault()
    this.store.saveProprietario(this.props.id)
  }

  onCpfCnpjChange(e) {
    this.store.proprietario.cpfCnpj = e.target.value
  }
  onRgInscricaoChange(e) {
    this.store.proprietario.rgInscricao = e.target.value
  }
  onNomeChange(e) {
    this.store.proprietario.nome = e.target.value
  }
  onTelefoneChange(e) {
    this.store.proprietario.telefone = e.target.value
  }
  onCelularChange(e) {
    this.store.proprietario.celular = e.target.value
  }
  onEmailChange(e) {
    this.store.proprietario.email = e.target.value
  }
  onEstadoChange(e) {
    this.store.proprietario.endereco.estado = e.target.value
  }
  onCidadeChange(e) {
    this.store.proprietario.endereco.cidade = e.target.value
  }
  onCepChange(e) {
    this.store.proprietario.endereco.cep = e.target.value
  }
  onRuaChange(e) {
    this.store.proprietario.endereco.rua = e.target.value
  }
  onNumeroChange(e) {
    this.store.proprietario.endereco.numero = e.target.value
  }
  onBairroChange(e) {
    this.store.proprietario.endereco.bairro = e.target.value
  }
  onComplementoChange(e) {
    this.store.proprietario.endereco.complemento = e.target.value
  }
  onPontoDeReferenciaChange(e) {
    this.store.proprietario.endereco.pontoDeReferencia = e.target.value
  }
}
