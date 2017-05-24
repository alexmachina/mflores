import React from 'react'
import ImoveisTableContainer from '../../geral/ImoveisTableContainer.jsx'
import { Jumbotron } from 'react-bootstrap'
import relatorioLocacaoStore from '../../../../stores/admin/relatorios/locacao/relatorioLocacaoStore.js'
import ParamsModal from '../controle/ParamsModal.jsx'
import { observer } from 'mobx-react'

@observer
export default class RelatorioLocacaoPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new relatorioLocacaoStore()
  }

  _onEditClick(imovelId) {
    this.store.imovelId = imovelId
    this.store.showModal = true
  }

  onModalClose() {
    this.store.showModal = false
  }

  onModalSubmit() {
    this.store.generatePdf()
  }

  onDataInicialChange(e) {
    this.store.dataInicial = e

  }

  onDataFinalChange(e) {
    this.store.dataFinal = e
  }

  render() {
    return(
    <div>
      <Jumbotron className="text-center admin-jumbotron">
        <h1>Relatorio de Locação</h1>
      </Jumbotron>
      <div className="container">
      <ImoveisTableContainer
          onEditClick={this._onEditClick.bind(this)}
      />
      <ParamsModal 
        show={this.store.showModal}
        close={this.onModalClose.bind(this)}
        dataInicial={this.store.dataInicial}
        dataFinal={this.store.dataFinal}
        onDataInicialChange={this.onDataInicialChange.bind(this)}
        onDataFinalChange={this.onDataFinalChange.bind(this)}
        onSubmit={this.onModalSubmit.bind(this)}
        erro={this.store.erro}
      />
    </div>
  </div>
    )
  }
}
