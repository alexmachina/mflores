import React from 'react'
import {Row, Col, Modal, Button} from 'react-bootstrap'
import ReceitasForm from './ReceitasForm.jsx'
import ReceitasPageStore from '../../../../../stores/admin/receitasPageStore.js'
import { observer } from 'mobx-react'
import ReceitasTable from './ReceitasTable.jsx'
import ConfirmationModal from '../../../geral/ConfirmationModal.jsx'
import ImovelHeader from '../../../geral/ImovelHeader.jsx'

@observer
export default class ReceitasPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ReceitasPageStore()
  }
  componentDidMount() {
    this.store.getReceitas(this.props.params.id)
  }
  render() {
    return(
      <div className="container-fluid">
        <Row>
          <ImovelHeader id={this.props.params.id} />
          <Col xs={12} md={8} mdOffset={2}>
            <ReceitasTable 
              receitas={this.store.receitas}
              onNovaReceitaClick={this.onNovaReceitaClick.bind(this)} 
              search={this.store.search}
              onSearchFormSubmit={this.onSearchSubmit.bind(this)}
              onDataInicialChange={this.onDataInicialChange.bind(this)}
              onDataFinalChange={this.onDataFinalChange.bind(this)}
              
              onEditClick={this.onEditClick.bind(this)}
              totalRecebido={this.store.totalRecebido}
              totalAReceber={this.store.totalAReceber}
              items={this.store.items}
              activePage={this.store.activePage}
              onSelect={this.onSelect.bind(this)}
            />
              
          </Col>
        </Row>
        <Row>
          <Modal show={this.store.showModal} onHide={() => {
            this.store.showModal = false }}>
            <Modal.Header closeButton>
              <Modal.Title>Receita</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <ReceitasForm 
                onDescricaoChange={this.onDescricaoChange.bind(this)}
                onDataChange={this.onDataChange.bind(this)}
                onDataVencimentoChange={this.onDataVencimentoChange.bind(this)}
                onValorChange={this.onValorChange.bind(this)}
                onModoPagamentoChange={this.onModoPagamentoChange.bind(this)}
                onObservacaoChange={this.onObservacaoChange.bind(this)}
                selectedReceita={this.store.selectedReceita}
                onSubmit={this.onSubmit.bind(this)}
                onDeleteClick={this.onDeleteClick.bind(this)}
              />
            </Modal.Body>
            <ConfirmationModal 
              header= "Sistema"
              question= "Deseja realmente deletar?"
              onConfirm={this.onDeleteConfirm.bind(this)}
              onDeny={this.onDeleteDeny.bind(this)}
              show={this.store.showDeleteConfirm}
            />
          </Modal>
        </Row>
      </div>
    )
  }

  onDeleteClick() {
    this.store.showDeleteConfirm = true
  }

  onDeleteConfirm() {
    this.store.deleteReceita()
     }

  onDeleteDeny() {
    this.store.showDeleteConfirm = false
  }
  onSubmit(e) {
    e.preventDefault()
    this.store.saveReceita(this.props.params.id)
  }

  onNovaReceitaClick() {
    this.store.showModal = true
    this.store.clearSelectedReceita()
  }

  onDescricaoChange(e) {
    this.store.selectedReceita.descricao = e.target.value
  }

  onDataChange(e) {
    this.store.selectedReceita.data = e
  }

  onDataVencimentoChange(e) {
    this.store.selectedReceita.dataVencimento = e
  }

  onValorChange(e, f) {
    this.store.selectedReceita.valor = f
  }

  onDataInicialChange(e) {
    this.store.search.dataInicial = e
  }

  onDataFinalChange(e) {
    this.store.search.dataFinal = e
  }
  onSearchSubmit(e) {
    e.preventDefault()
    this.store.activePage = 1
    this.store.searchByDate(this.props.params.id)
    this.store.isSearch = true
  }

  onObservacaoChange(e) {
    this.store.selectedReceita.observacao = e.target.value
  }

  onModoPagamentoChange(e) {
    this.store.selectedReceita.modoPagamento = e.target.value
  }

  onEditClick(receitaId) {
    this.store.getReceita(receitaId, this.props.params.id)
    this.store.showModal = true
  }

  onSelect(page){
      this.store.activePage = page
    if(!this.store.isSearch) {
      this.store.getReceitas(this.props.params.id)
    } else {
      this.store.searchByDate(this.props.params.id)
    }
  }
}

