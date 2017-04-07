import React from 'react'
import {Row, Col, Modal, Button} from 'react-bootstrap'
import ReceitasForm from './ReceitasForm.jsx'
import ReceitasPageStore from '../../../../stores/admin/receitasPageStore.js'
import { observer } from 'mobx-react'
import ReceitasTable from './ReceitasTable.jsx'

@observer
export default class ReceitasPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ReceitasPageStore()
  }
  componentDidMount() {
    this.store.getReceitas(this.props.id)
  }
  render() {
    return(
      <div className="container-fluid">
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <ReceitasTable 
              receitas={this.store.receitas}
              onNovaReceitaClick={this.onNovaReceitaClick.bind(this)} 
              search={this.store.search}
              onSearchFormSubmit={this.onSearchSubmit.bind(this)}
              onDataInicialChange={this.onDataInicialChange.bind(this)}
              onDataFinalChange={this.onDataFinalChange.bind(this)}
              onEditClick={this.onEditClick.bind(this)}
              totalReceitas={this.store.totalReceitas}
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
                onValorChange={this.onValorChange.bind(this)}
                onObservacaoChange={this.onObservacaoChange.bind(this)}
                selectedReceita={this.store.selectedReceita}
                onSubmit={this.onSubmit.bind(this)}
              />
                

            </Modal.Body>
          </Modal>
        </Row>
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    this.store.saveReceita(this.props.id)
  }

  onNovaReceitaClick() {
    this.store.showModal = true
  }

  onDescricaoChange(e) {
    this.store.selectedReceita.descricao = e.target.value
  }

  onDataChange(e) {
    this.store.selectedReceita.data = e
  }
  onValorChange(e) {
    this.store.selectedReceita.valor = e.target.value
  }

  onDataInicialChange(e) {
    this.store.search.dataInicial = e
  }

  onDataFinalChange(e) {
    this.store.search.dataFinal = e
  }
  onSearchSubmit(e) {
    e.preventDefault()
    this.store.searchByDate(this.props.id)
  }

  onObservacaoChange(e) {
    this.store.selectedReceita.observacao = e.target.value
  }

  onEditClick(receitaId) {
    this.store.getReceita(receitaId, this.props.id)
    this.store.showModal = true
  }
}

