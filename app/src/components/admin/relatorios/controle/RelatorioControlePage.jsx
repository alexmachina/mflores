import React from 'react'
import ImoveisTableContainer from '../../geral/ImoveisTableContainer.jsx'
import { Row, Col, Jumbotron } from 'react-bootstrap'
import RelatorioControlePageStore from 
'../../../../stores/admin/relatorios/controle/relatorioControlePageStore.js'
import ReceitaDespesaModal from './ReceitaDespesaModal.jsx'
import { observer } from 'mobx-react'
import './styles.scss'
import ParamsModal from './ParamsModal.jsx'

@observer
export default class RelatorioControlePage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new RelatorioControlePageStore()
  }

  receitaDespesaModalClose() {
    this.store.showReceitaDespesaModal = false
  }

  onEditClick(imovelId) {
    this.store.showReceitaDespesaModal = true
    this.store.imovelId = imovelId
    this.store.dataInicial = null,
    this.store.dataFinal = null
    this.store.erro = ''
  }

  onReceitasClick() {
    this.store.showReceitaDespesaModal = false
    this.store.tipoSelecionado = 'Receitas'
    this.store.showParamsModal = true
  }

  onDespesasClick() {
    this.store.showReceitaDespesaModal = false
    this.store.tipoSelecionado = 'Despesas'
    this.store.showParamsModal = true
  }
  closeParamsModal() {
    this.store.showParamsModal = false
  }

  onDataFinalChange(e) {
    this.store.dataFinal = e
  }
  onDataInicialChange(e) {
    this.store.dataInicial = e
  }
  onSubmit() {
    this.store.gerarRelatorio()
  }

  render() {
    return(
      <div>
        <Jumbotron className="text-center admin-jumbotron">
          <h1>Relatório de Controle</h1>
        </Jumbotron>
        <div className="container">
          <ImoveisTableContainer onEditClick={this.onEditClick.bind(this)} />
        </div>
        <ReceitaDespesaModal 
          close={this.receitaDespesaModalClose.bind(this)}
          show={this.store.showReceitaDespesaModal}
          onReceitasClick={this.onReceitasClick.bind(this)}
          onDespesasClick={this.onDespesasClick.bind(this)}
        />
        <ParamsModal
          show={this.store.showParamsModal}
          close={this.closeParamsModal.bind(this)}
          dataInicial={this.store.dataInicial}
          dataFinal={this.store.dataFinal}
          onDataInicialChange={this.onDataInicialChange.bind(this)}
          onDataFinalChange={this.onDataFinalChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          erro={this.store.erro}
        />
      </div>
      )
  }
}
