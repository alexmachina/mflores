import React from 'react'
import {Col, Row, Table, Button, Jumbotron, Pagination} from 'react-bootstrap'
import ModeloStore from '../../../../stores/admin/modeloStore.js'
import Loader from 'react-loader'
import { Link } from 'react-router'

export default class ModelosTable extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ModeloStore()
  }

  componentDidMount() {
    this.store.getModelos(1)
  }
  render() {
    return (
      <div>
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Modelos de Contrato</h1>
        </Jumbotron>
        <div className="container">
          <Col xs={12} md={6}>
          <Pagination
            activePage={this.store.activePage}
            items={this.store.count}
            onSelect={this.onSelect.bind(this)}
          />
        </Col>
        <Col xs={12} md={6} className="text-right">
          <Link to="admin/contrato/modelo">
          <Button bsStyle="primary" bsSize="large">
            Adicionar Modelo
          </Button>
        </Link>
        </Col>
          <p>{this.store.error}</p>
          <Loader loaded={this.store.loaded}>
          <Table striped>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {this.store.modelos.map(m => (
                <tr>
                  <td>{m.titulo}</td>
                  <td>
                    <Button
                      onClick={this.onEditClick.bind(this)}
                      bsStyle="default">
                      <Glyphicon glyph="edit" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </Table>
        </Loader>
        </div>
      </div>
    )
  }

  onSelect(page){
    this.store.getModelos(page)
  }
}
