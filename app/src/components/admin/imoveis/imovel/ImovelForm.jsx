import React from 'react'
import ImovelFormStore from '../../../../stores/admin/imovelFormStore'
import { observer } from 'mobx-react'
import {Row,Modal, Col, Button} from 'react-bootstrap'
import Input from '../../../utils/Input.jsx'
import Select from '../../../utils/Select.jsx'
import validator from 'validator'
import CurrencyInput from 'react-currency-input'
import Loader from 'react-loader'

@observer
export default class ImovelForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImovelFormStore()
  }

  componentDidMount() {
    this.store.getImovel(this.props.id)
    this.store.getProprietarios()
  }
  render() {
    let TipoOptions = [
      {value:'Apartamento', option:'Apartamento'},
      {value: 'Casa de Condominio', option:'Casa de Condominio'},
      {value: 'Casa', option: 'Casa'},
      {value: 'Industrial', option:'Industrial'},
      {value: 'Terreno', option:'Terreno'},
      {value: 'Comercial', option: 'Comercial'},
      {value: 'Galpão', option: 'Galpão'},
      {value: 'Chácara', option: 'Chácara'},
      {value: 'Sobrado', option: 'Sobrado'},
      {value: 'Sobrado Residencial', option: 'Sobrado Residencial'},
      {value: 'Predio', option: 'Predio'},
      {value: 'Predio Comercial', option: 'Predio Comercial'},
      {value: 'Sitio', options: 'Sitio'}
    ]
    return(
      <div className="container-fluid">
        <Row>
          <Loader loaded={this.store.loaded}>
          <Col xs={12} md={8} mdOffset={2}>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Select label="Proprietario"
                options={this.store.proprietariosArr}
                onChange={this.onProprietarioChange.bind(this)}
                value={this.store.imovel.proprietario}
              />
              <Input 
                label="Titulo"
                onChange={this.onTituloChange.bind(this)}
                value={this.store.imovel.titulo}
              />
              <Input 
                label="RGI"
                value={this.store.imovel.rgi}
                onChange={this.onRgiChange.bind(this)}
              />

            <Select label="Tipo"
              options={TipoOptions}
              validationMessage="Campo invalido"
              validationFunction={(v) => 
              v ? true : false
              }
              onChange={this.onTipoChange.bind(this)}
              value={this.store.imovel.tipo}
            />
            <Input 
              label="Observação (Gestor)"
              value={this.store.imovel.observacaoGestor}
              onChange={this.onObservacaoGestorChange.bind(this)}
            />
            <label>Area Construída</label>
            <CurrencyInput 
              decimalSeparator=","
      thousandSeparator="."
      className="form-control"
      value={this.store.imovel.metragem.areaConstruida}
      onChange={this.onAreaConstruidaChange.bind(this)}
      />

    <label>Area Total</label>
    <CurrencyInput 
      decimalSeparator=","
      thousandSeparator="."
      className="form-control"
      value={this.store.imovel.metragem.areaTotal}
      onChange={this.onAreaTotalChange.bind(this)}
      />


    <Input label="Instalação"
      value={this.store.imovel.instalacao}
      onChange={this.onInstalacaoChange.bind(this)}
    />
    <Input label="Capacidade Instalada"
      value={this.store.imovel.capacidadeInstalada}
      onChange={this.onCapacidadeInstaladaChange.bind(this)}
      className="col-xs-12 col-md-6"
    />
    <Input label="Capacidade Disponível"
      value={this.store.imovel.capacidadeDisponivel}
      onChange={this.onCapacidadeDisponivelChange.bind(this)}
      className="col-xs-12 col-md-6"
    />


  <label>Zoneamento?</label>
  <input type="checkbox"
    checked={this.store.imovel.zoneamento}
    onChange={this.onZoneamentoChange.bind(this)}
    className="form-control"
  />
  <label>Preço de Venda</label>
  <CurrencyInput
    decimalSeparator=","
      thousandSeparator="."
      prefix="R$"
      className="form-control"
      value={this.store.imovel.precoVenda}
      onChange={this.onPrecoVendaChange.bind(this)}
      />

    <label>Preço de Locação</label>
    <CurrencyInput 
      decimalSeparator=","
      thousandSeparator="."
      prefix="R$" 
      className="form-control"
      value={this.store.imovel.precoLocacao}
      onChange={this.onPrecoLocacaoChange.bind(this)}
      />

    <label>Valor do condomínio</label>
    <CurrencyInput 
      prefix="R$"
      decimalSeparator=","
      thousandSeparator="."
      className="form-control"
      value={this.store.imovel.valorCondominio}
      onChange={this.onValorCondominioChange.bind(this)}
      />

    <Input label="IPTU"
      onChange={this.onIPTUChange.bind(this)}
      value={this.store.imovel.IPTU}
    />
    <label>Valor Anual IPTU</label>
    <CurrencyInput 
      prefix="R$" 
      decimalSeparator=","
      thousandSeparator="."
      className="form-control"
      value={this.store.imovel.valorAnualIPTU}
      onChange={this.onValorAnualIPTUChange.bind(this)}
      />
      <Input label="Valor Parcelado IPTU"
        onChange={this.onValorParceladoIPTUChange.bind(this)}
        value={this.store.imovel.valorParceladoIPTU}
      />
      <Button style={this.store.buttonStyle} className="form-button" className="save-button" type="submit">
        {this.store.buttonText}
      </Button>
      <div className="text-center">
      </div>
      <Button onClick={() => this.store.showDeleteModal = true} style={{marginTop:'30px',width:'100%'}} className="btn btn-danger">
        Deletar
      </Button>
      <Modal show={this.store.showDeleteModal} onHide={() => this.store.showDeleteModal = false}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar Imovel?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        </Modal.Body>

        <Modal.Footer>

          <Button bsStyle="danger" onClick={this.onDeleteButtonClick.bind(this)}style={{}}>Sim</Button>
          <Button onClick={() => this.store.showDeleteModal = false}>Cancelar</Button>
        </Modal.Footer>

      </Modal>
    </form>
  </Col>
</Loader>
</Row>
        </div>
      )
  }

  onDeleteButtonClick(e) {
    this.store.delete(this.props.id)
  }

  onProprietarioChange(e) {
    this.store.imovel.proprietario = e.target.value
  }

  onSubmit(e) {
    e.preventDefault()
    this.store.save(this.props.id)
  }

  onTituloChange(e) {
    this.store.imovel.titulo = e.target.value
  }

  onRgiChange(e) {
    this.store.imovel.rgi = e.target.value
  }
  onTipoChange(e) {
    this.store.imovel.tipo = e.target.value
  }

  onObservacaoGestorChange(e) {
    this.store.imovel.observacaoGestor = e.target.value
  }

  onObservacaoWebsiteChange(e) {
    this.store.imovel.observacaoWebsite = e.target.value
  }

  onAreaConstruidaChange(e) {
    this.store.imovel.metragem.areaConstruida = e
  }

  onAreaTotalChange(e) {
    this.store.imovel.metragem.areaTotal = e
  }

  onCapacidadeInstaladaChange(e) {
    this.store.imovel.capacidadeInstalada = e.target.value
  }

  onCapacidadeDisponivelChange(e) {
    this.store.imovel.capacidadeDisponivel = e.target.value
  }


  onInstalacaoChange(e) {
    this.store.imovel.instalacao = e.target.value
  }
  onEnergiaChange(e) {
    this.store.imovel.energia = e.target.value
  }


  onZoneamentoChange(e) {
    this.store.imovel.zoneamento = e.target.checked
  }
  onPrecoVendaChange(e, f) {
    this.store.imovel.precoVenda = f
  }

  onPrecoLocacaoChange(e, f) {
    this.store.imovel.precoLocacao = f
  }

  onValorCondominioChange(e, f) {
    this.store.imovel.valorCondominio = f
  }

  onIPTUChange(e) {
    this.store.imovel.IPTU = e.target.value
  }

  onValorAnualIPTUChange(e, f) {
    this.store.imovel.valorAnualIPTU = f
  }

  onValorParceladoIPTUChange(e) {
    this.store.imovel.valorParceladoIPTU = e.target.value
  }
}
