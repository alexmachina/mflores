import React from 'react'
import {Row, Pagination, Col, Button, Jumbotron, Table} from 'react-bootstrap'
import RelatorioImoveisStore from '../../../stores/admin/relatorios/relatorioImoveisStore.js'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
@observer
export default class RelatorioImoveisPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new RelatorioImoveisStore()
  }
  
  componentDidMount() {
    this.store.getImoveis()
  }

  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col xs={12}>
            <Jumbotron className="text-center admin-jumbotron">
              <h1>Relatório de Imóveis</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <Pagination
              items={this.store.items}
              activePage={this.store.activePage}
              onSelect={this.handleSelect.bind(this)}
            />
            <Table hover className="text-center"> 
              <thead>
                <tr>
                  <th>Titulo</th>
                </tr>
              </thead>
              <tbody>
                {this.store.imoveis.map(i => (
                  <tr key={i._id}>
                    <td>
                      <Link to={'/relatorios/imovel/'+i._id}>
                    {i.titulo}
                  </Link>
                  </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

        </Row>
      </div>
    )
  }

  handleSelect(e) {
    this.store.activePage = e
    this.store.getImoveis()
  }
}
