import React from 'react'
import ProprietariosTableContainer from '../../geral/ProprietariosTableContainer.jsx'
import {Jumbotron, Col, Row, Button} from 'react-bootstrap'
import Input from '../../../utils/Input.jsx'
import Select from '../../../utils/Select.jsx'
import DatePicker from 'react-datepicker'
import RelatorioProprietariosStore from '../../../../stores/admin/relatorios/proprietarios/relatorioProprietariosStore.js'
import { observer } from 'mobx-react'

@observer
export default class RelatorioResumoProprietarios extends React.Component{
  constructor(props) {
    super(props)
    this.store = new RelatorioProprietariosStore()
  }

  componentDidMount() {
    this.store.getProprietarios()
    this.store.getEstados()
  }
  render() {
    return(
      <div>
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Relatório de Proprietários</h1>
        </Jumbotron>

        <Row>
          <Col xs={12} sm={4} smOffset={4}>
            <form onSubmit={this.onSubmit.bind(this)}>
              <div>
                <label>Data Inicial</label>
                <Select 
                  options={this.store.proprietarios}
                  value={this.store.selectedProprietario}
                  validationMessage="Selecione um proprietário"
                  onChange={this.onProprietarioChange.bind(this)}
                />
                <label>Data Final</label>
                <DatePicker
                  selected={this.store.dataInicial}
                  onChange={this.onDataInicialChange.bind(this)}
                  className="date-picker"
                />
                <label>Data Final</label>
                <DatePicker
                  selected={this.store.dataFinal}
                  onChange={this.onDataFinalChange.bind(this)}
                  className="date-picker"
                />
                <Select
                  label="Estado"
                  options={this.store.estados}
                  value={this.store.selectedEstado}
                  validationMessage="Selecione um estado"
                  onChange={this.onEstadoChange.bind(this)}
                />
                <Select
                  label="Cidade"
                  options={this.store.cidades}
                  value={this.store.selectedCidade}
                  validationMessage="Selecione uma cidade"
                  onChange={this.onCidadeChange.bind(this)}
                />
              </div>
              <br />
              <Button type="submit" bsStyle="primary" className="form-control submit-button">
                Gerar Relatório
              </Button>
              <span className="erro">{this.store.error_message}</span>
            </form>
          </Col>
        </Row>
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    if (!this.store.dataInicial || !this.store.dataFinal)
      return this.store.error_message = 'Preencha todos os campos'

    this.store.generatePdf()

  }

  onDataInicialChange(e) {
    this.store.dataInicial = e
  }
  onDataFinalChange(e) {
    this.store.dataFinal = e
  }
  onProprietarioChange(e) {
    this.store.nomeProprietario = e.target[e.target.selectedIndex].innerText
    this.store.selectedProprietario = e.target.value
  }
  onEstadoChange(e) {
    this.store.selectedEstado = e.target.value
    this.store.getCidades(e.target.value)
  }
  onCidadeChange(e) {
    this.store.selectedCidade = e.target.value
  }
}
