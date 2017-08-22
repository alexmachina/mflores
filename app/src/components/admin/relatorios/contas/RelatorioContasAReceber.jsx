import React from 'react'
import { Row, Col, Jumbotron, Button } from 'react-bootstrap'
import RelatorioContasAReceberStore from 
'../../../../stores/admin/relatorios/contas/relatorioContasAReceberStore'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import Input from '../../../utils/Input.jsx'
import Select from '../../../utils/Select.jsx'

@observer
export default class RelatorioContasAReceber extends React.Component {
  constructor(props) {
    super(props)
    this.store = new RelatorioContasAReceberStore()
  }

  componentDidMount() {
    this.store.getProprietarios()
    this.store.getEstados()
  }
  
  render() {
    return(
      <div>
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Contas á Receber</h1>
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
            <label>Data de Recebimento Inicial</label>
            <DatePicker
              selected={this.store.dataPagamentoInicial}
              onChange={this.onDataRecebimentoInicialChange.bind(this)}
              className="date-picker"
            />
          </div>
          <div>
            <label>Data de Recebimento Final</label>
            <DatePicker
              selected={this.store.dataPagamentoFinal}
              onChange={this.onDataRecebimentoFinalChange.bind(this)}
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
  onDataRecebimentoInicialChange(e) {
    this.store.dataPagamentoInicial = e
  }

  onDataRecebimentoFinalChange(e) {
    this.store.dataPagamentoFinal = e
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
