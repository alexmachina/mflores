import React from 'react'
import DespesasPageStore from '../../../stores/admin/despesasPageStore.js'
import DespesasForm from './DespesasForm.jsx'
import DespesasTable from './DespesasTable.jsx'
import { observer } from 'mobx-react'
import {Row,Pagination, Col, Button, Modal} from 'react-bootstrap' 
@observer
export default class DespesasPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new DespesasPageStore()
  }
  componentDidMount() {
    this.store.getDespesas(this.props.id)
  }
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col xs={12} md={8} mdOffset={2} >
            <Pagination 
              prev
              next
              activePage={this.store.activePage}
              onSelect={this.handlePaginationSelect.bind(this)}
              items={this.store.items}
            />
            <DespesasTable
              despesas={this.store.despesas} 
              onEditClick={this.onEditClick.bind(this)}
              onNewClick={this.onNewClick.bind(this)}
              ano={this.store.search.ano}
              mes={this.store.search.mes}
              onAnoChange={this.onSearchAnoChange.bind(this)}
              onMesChange={this.onSearchMesChange.bind(this)}
              onSearchFormSubmit={this.onSearchFormSubmit.bind(this)}
              totalDespesas={this.store.totalDespesas}
            />
            <div>
            <Modal show={this.store.showModal} onHide={() => {
              this.store.showModal = false
            }}>
              <Modal.Header closeButton>
                <Modal.Title>Despesa</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <DespesasForm  
                  onDescricaoChange={this.onDescricaoChange.bind(this)} 
                  onValorChange={this.onValorChange.bind(this)}
                  onAnoChange={this.onAnoChange.bind(this)}
                  onMesChange={this.onMesChange.bind(this)}
                  selectedDespesa={this.store.selectedDespesa} 
                  onSubmit={this.onSubmit.bind(this)} />
              </Modal.Body>
            </Modal>
          </div>
          </Col>
        </Row>
      </div>
    )
  }

  handlePaginationSelect(activePage) {
    this.store.activePage = activePage
    this.store.getDespesas(this.props.id)
  }
  onEditClick(despesa) {
    this.store.selectedDespesa = despesa
    this.store.showModal = true
  }

  onSearchAnoChange(e) {
    this.store.search.ano = e.target.value
  }

  onSearchMesChange(e) {
    this.store.search.mes = e.target.value
  }

  onSearchFormSubmit(e) {
    e.preventDefault()
    this.store.getDespesasByAnoMes(this.props.id)
  }

  onNewClick() {
    this.store.selectedDespesa = {
      data: null
    }
    this.store.showModal = true
  }

  onSubmit(e) {
    e.preventDefault()
    this.store.saveDespesa(this.props.id)

  }

  onDescricaoChange(e) {
    this.store.selectedDespesa.descricao = e.target.value
  }

  onValorChange(e) {
    this.store.selectedDespesa.valor = e.target.value
  }

  onAnoChange(e) {
    this.store.selectedDespesa.ano = e.target.value
  }

  onMesChange(e) {
    this.store.selectedDespesa.mes = e.target.value
  }

  onSelectDespesa(despesa) {
    this.store.selectedDespesa = despesa
  }
}
