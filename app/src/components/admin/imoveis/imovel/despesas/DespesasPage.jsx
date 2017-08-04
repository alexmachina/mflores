import React from 'react'
import DespesasPageStore from '../../../../../stores/admin/despesasPageStore.js'
import DespesasForm from './DespesasForm.jsx'
import DespesasTable from './DespesasTable.jsx'
import { observer } from 'mobx-react'
import {Row,Pagination, Col, Button, Modal} from 'react-bootstrap' 
import ConfirmationModal from '../../../geral/ConfirmationModal.jsx'
import ImovelHeader from '../../../geral/ImovelHeader.jsx'

@observer
export default class DespesasPage extends React.Component {
  constructor(props) {
    super(props)
      this.store = new DespesasPageStore()
  }
  componentDidMount() {
    this.store.getDespesas(this.props.params.id)
  }
  render() {
    return (
        <div>
        <ImovelHeader id={this.props.params.id} />
          <Row>
            <Col xs={12} md={8} mdOffset={2} >
              <DespesasTable
                despesas={this.store.despesas} 
                dataInicial = {this.store.search.dataInicial}
                dataFinal = {this.store.search.dataFinal}
                onEditClick={this.onEditClick.bind(this)}
                onNewClick={this.onNewClick.bind(this)}
                onDataInicialChange={this.onDataInicialChange.bind(this)}
                onDataFinalChange={this.onDataFinalChange.bind(this)}
                onSearchFormSubmit={this.onSearchFormSubmit.bind(this)}
                totalDespesas={this.store.totalDespesas}
                items={this.store.items}
                activePage={this.store.activePage}
                onSelect={this.onSelect.bind(this)}
              />
              <div>
                <Modal show={this.store.showModal}  className="vem-pra-ca" onHide={() => {
                  this.store.showModal = false
                  }}>
                  <Modal.Header closeButton>
                    <Modal.Title>Despesa</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <DespesasForm  
                      onDescricaoChange={this.onDescricaoChange.bind(this)} 
                      onValorChange={this.onValorChange.bind(this)}
                      onDataChange={this.onDataChange.bind(this)}
                      onDataVencimentoChange={this.onDataVencimentoChange.bind(this)}
                      onObservacaoChange={this.onObservacaoChange.bind(this)}
                      selectedDespesa={this.store.selectedDespesa} 
                      onSubmit={this.onSubmit.bind(this)} 
                      onDeleteClick={this.onDeleteClick.bind(this)}
                    />
                    <ConfirmationModal
                      show={this.store.showConfirmation}
                      header="Sistema"
                      question="Deseja realmente deletar?"
                      onConfirm={this.confirmDelete.bind(this)}
                      onDeny={this.denyDelete.bind(this)}
                    />
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
      this.store.getDespesas(this.props.params.id)
  }
  onEditClick(despesa) {
    this.store.selectedDespesa = despesa
      this.store.showModal = true
  }

  onDataInicialChange(e) {
    this.store.search.dataInicial = e
  }

  onDataFinalChange(e) {
    this.store.search.dataFinal = e
  }


  onSearchFormSubmit(e) {
    e.preventDefault()
      this.store.getDespesasByData(this.props.params.id)
      this.store.isSearch = true
  }

  onNewClick() {
    this.store.selectedDespesa = {
      data: null,
      dataVencimento: null
    }
    this.store.showModal = true
  }

  onSubmit(e) {
    e.preventDefault()
      this.store.saveDespesa(this.props.params.id)
  }

  onDeleteClick(id) {
    this.store.idToDelete = id
    this.store.showConfirmation = true
  }

  confirmDelete() {
    this.store.deleteDespesa()
    this.store.showConfirmation = false
    this.store.showModal = false
    if (!this.store.isSearch) {
      this.store.getDespesas(this.props.id)
    } else {
      this.store.getDespesasByData(this.props.params.id)
    }
  }

  denyDelete() {
    this.store.showConfirmation = false
  }

  onDescricaoChange(e) {
    this.store.selectedDespesa.descricao = e.target.value
  }

  onValorChange(e, f) {
    this.store.selectedDespesa.valor = f
  }
  onDataChange(e) {
    this.store.selectedDespesa.data = e
  }

  onDataVencimentoChange(e) {
    this.store.selectedDespesa.dataVencimento = e
  }
  onObservacaoChange(e) {
    this.store.selectedDespesa.observacao = e.target.value
  }

  onSelect(page) {
    this.store.activePage = page;
    if(!this.store.isSearch) 
      this.store.getDespesas(this.props.params.id)
    else
      this.store.getDespesasByData(this.props.params.id)
  }


  onSelectDespesa(despesa) {
    this.store.selectedDespesa = despesa
  }
}
