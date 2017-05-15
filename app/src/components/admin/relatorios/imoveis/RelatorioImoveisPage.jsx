import React from 'react'
import {Row, Pagination, Col, Button, Jumbotron, Table, Modal} from 'react-bootstrap'
import RelatorioImovelStore from '../../../../stores/admin/relatorios/imovel/relatorioImovelStore.js'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
  import ImoveisTableContainer from '../../geral/ImoveisTableContainer.jsx'
@observer
export default class RelatorioImoveisPage extends React.Component {
  constructor(props) {
    super(props)
    this.imovelStore = new RelatorioImovelStore()
  }
  
  render() {
    return (
      <div>
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Relatório de Imovel</h1>
        </Jumbotron>
        <div className="container">
          <ImoveisTableContainer onEditClick={(id) => this.imovelStore.generatePdf(id)} />
        </div>
      </div>
      )
  }
}
