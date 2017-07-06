import React from 'react'
import { Row, Col, Jumbotron, Button } from 'react-bootstrap'
import RelatorioContasAPagarStore from 
'../../../../stores/admin/relatorios/contas/relatorioContasAPagarStore.js'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import Input from '../../../utils/Input.jsx'
import Select from '../../../utils/Select.jsx'

@observer
export default class RelatorioContasAPagar extends React.Component {
  constructor(props) {
    super(props)
    this.store = new RelatorioContasAPagarStore()
  }

  componentDidMount() {
    this.store.getProprietarios()
    this.store.getEstados()
  }
  
  render() {
    return(
      <div>
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Contas á Pagar</h1>
        </Jumbotron>
        <div className="container">
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <Select label="Proprietário"
              options={this.store.proprietarios}
              onChange={this.onProprietarioChange.bind(this)}
              selected={this.store.proprietario}
            />
          </div>
          <div>
            <label>Data de Vencimento Inicial</label>
            <DatePicker
              selected={this.store.dataVencimentoInicial}
              onChange={this.onDataVencimentoInicialChange.bind(this)}
              className="date-picker"
            />
          </div>
          <div>
            <label>Data de Vencimento Final</label>
            <DatePicker
              selected={this.store.dataVencimentoFinal}
              onChange={this.onDataVencimentoFinalChange.bind(this)}
              className="date-picker"
            />
          </div>
          <div>
            <Select label="Estado"
              options={this.store.estados}
              selected={this.store.estado}
              onChange={this.onEstadoChange.bind(this)}
            />
          </div>
          <div>
            <Select label="Cidade"
              options={this.store.cidades}
              selected={this.store.cidade}
              onChange={this.onCidadeChange.bind(this)}
            />
          </div>
          <Button type="submit" bsStyle="primary" className="form-control">
            Gerar Relatório
          </Button>
        </form>
      </div>
    </div>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    this.store.generatePdf()
  }

  onProprietarioChange(e) {
    this.store.proprietario = e.target.value
    this.store.nomeProprietario = e.target[e.target.selectedIndex].innerText
  }
  onDataVencimentoInicialChange(e) {
    this.store.dataVencimentoInicial = e
  }

  onDataVencimentoFinalChange(e) {
    this.store.dataVencimentoFinal = e
  }

  onEstadoChange(e) {
    this.store.estado = e.target.value
    this.store.getCidades(e.target.value)
  }
  onCidadeChange(e) {
    this.store.cidade = e.target.value
    this.store.nomeCidade = e.target[e.target.selectedIndex].innerText
  }
}
