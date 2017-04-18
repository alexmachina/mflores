import React from 'react'
import ImovelFormStore from '../../../stores/admin/imovelFormStore'
import { observer } from 'mobx-react'
import {Row,Modal, Col, Button} from 'react-bootstrap'
import Input from '../../utils/Input.jsx'
import Select from '../../utils/Select.jsx'
import validator from 'validator'

@observer
export default class ImovelForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImovelFormStore()
  }

  componentDidMount() {
    this.store.getImovel(this.props.id)
  }
  render() {
    let TipoOptions = [
      {value:'Apartamento', option:'Apartamento'},
      {value: 'Casa de Condominio', option:'Casa de Condominio'},
      {value: 'Casa', option: 'Casa'},
      {value: 'Industrial', option:'Industrial'},
      {value: 'Terreno', option:'Terreno'},
      {value: 'Comercial', option: 'Comercial'},
      {value: 'Galpão', option: 'Galpão'}
    ]
    return(
      <div className="container-fluid">
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Input 
                label="Titulo"
                onChange={this.onTituloChange.bind(this)}
                value={this.store.imovel.titulo}
              />
              <Input 
                label="RGI"
                validationMessage="Campo invalido"
                validationFunction={validator.isInt}
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
            <Input label="Area Construída (em metros)"
              value={this.store.imovel.metragem.areaConstruida}
              onChange={this.onAreaConstruidaChange.bind(this)}
              validationMessage="Campo invalido"
              validationFunction={validator.isInt}
            />

          <Input label="Area Total (em metros)"
            value={this.store.imovel.metragem.areaTotal}
            onChange={this.onAreaTotalChange.bind(this)}
            validationMessage="Campo invalido"
            validationFunction={validator.isInt}
          />
          <Input label="Capacidade (em metros)" 
            value={this.store.imovel.metragem.capacidade}
            onChange={this.onCapacidadeChange.bind(this)}
          />

        <Input label="Instalação"
          value={this.store.imovel.instalacao}
          onChange={this.onInstalacaoChange.bind(this)}
        />

      <label>Zoneamento?</label>
      <input type="checkbox"
        checked={this.store.imovel.zoneamento}
        onChange={this.onZoneamentoChange.bind(this)}
        className="form-control"
      />
      <Input label="Preço de venda"
        onChange={this.onPrecoVendaChange.bind(this)}
        value={this.store.imovel.precoVenda}
      />
      <Input label="Preço de locação"
        onChange={this.onPrecoLocacaoChange.bind(this)}
        value={this.store.imovel.precoLocacao}
      />
      <Input label="Valor do Condominio"
        onChange={this.onValorCondominioChange.bind(this)}
        value={this.store.imovel.valorCondominio}
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
    </Row>
  </div>
    )
  }

  onDeleteButtonClick(e) {
    this.store.delete(this.props.id)
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
    this.store.imovel.metragem.areaConstruida = e.target.value
  }

  onAreaTotalChange(e) {
    this.store.imovel.metragem.areaTotal = e.target.value
  }

  onCapacidadeChange(e) {
    this.store.imovel.metragem.capacidade = e.target.value
  }

  onInstalacaoChange(e) {
    this.store.imovel.instalacao = e.target.value
  }


  onZoneamentoChange(e) {
    this.store.imovel.zoneamento = e.target.checked
  }
  onPrecoVendaChange(e) {
    this.store.imovel.precoVenda = e.target.value
  }

  onPrecoLocacaoChange(e) {
    this.store.imovel.precoLocacao = e.target.value
  }

  onValorCondominioChange(e) {
    this.store.imovel.valorCondominio = e.target.value
  }
}
