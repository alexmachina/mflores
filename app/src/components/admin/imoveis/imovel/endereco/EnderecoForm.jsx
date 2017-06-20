import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import EnderecoFormStore from '../../../../../stores/admin/enderecoFormStore.js'
import Input from '../../../../utils/Input.jsx'
import Select from '../../../../utils/Select.jsx'
import { observer } from 'mobx-react'

@observer
export default class EnderecoForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = new EnderecoFormStore()
  }
  componentDidMount() {
    this.store.getEndereco(this.props.id)
    this.store.getEstados()
  }
  render() {
    return(
      <div className="container-fluid">
        <Row>
          <Col md={8} mdOffset={2}>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Select 
                label="Estado"
                options={this.store.estados}
                value={this.store.endereco.estado}
                onChange={this.onEstadoChange.bind(this)}
                validationMessage="Campo invalido"
              />
              <Select
                label="cidade"
                options={this.store.cidades}
                value={this.store.endereco.cidade}
                onChange={this.onCidadeChange.bind(this)}
                validationMessage="Escolha uma cidade"
              />
                          <Input label="Bairro"
                value={this.store.endereco.bairro}
                onChange={this.onBairroChange.bind(this)}
              />
              <Input label="CEP"
                value={this.store.endereco.cep}
                onChange={this.onCepChange.bind(this)}
              />
              <Input label="Rua"
                value={this.store.endereco.rua}
                onChange={this.onRuaChange.bind(this)}
              />
              <Input label="Numero"
                value={this.store.endereco.numero}
                onChange={this.onNumeroChange.bind(this)}
              />
              <Input label="Complemento"
                value={this.store.endereco.complemento}
                onChange={this.onComplementoChange.bind(this)}
              />
              <Input label="Ponto de Referência"
                value={this.store.endereco.pontoDeReferencia}
                onChange={this.onPontoDeReferenciaChange.bind(this)}
              />
              <Button style={this.store.buttonStyle} type="submit" 
                className="save-button"
              >{this.store.buttonText}</Button>


          </form>
        </Col>
      </Row>
    </div>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    this.store.save(this.props.id)
  }

  onEstadoChange(e) {
    this.store.endereco.estado = e.target.value
    this.store.getCidades(e.target.value)
  }
  onCidadeChange(e) {
    this.store.endereco.cidade = e.target.value
  }
  onBairroChange(e) {
    this.store.endereco.bairro = e.target.value
  } 
  onCepChange(e) {
    this.store.endereco.cep = e.target.value
  }
  onRuaChange(e){
    this.store.endereco.rua = e.target.value
  }
  onNumeroChange(e) {
    this.store.endereco.numero = e.target.value
  }
  onComplementoChange(e) {
    this.store.endereco.complemento = e.target.value
  }
  onPontoDeReferenciaChange(e) {
    this.store.endereco.pontoDeReferencia = e.target.value
  }
}
