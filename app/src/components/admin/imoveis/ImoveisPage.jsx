import React from 'react'
import {Modal, Row, Jumbotron, Col, Button, Table, Glyphicon} from 'react-bootstrap'
import { Link } from 'react-router'
import uiStore from '../../../stores/admin/uiStore.js'
import ImoveisStore from '../../../stores/admin/imoveisStore.js'
import {observer} from 'mobx-react'
import Input from '../../utils/Input.jsx'
import validator from 'validator'


@observer
export default class ImoveisPage extends React.Component {
  constructor(props) {
    super(props)
    this.uiStore = new uiStore()
    this.store = new ImoveisStore()
  }

  componentDidMount() {
    this.store.getImoveis()
  }
    
  render() {
    return(
      <div>
        <Row>
          <Col>
        <Jumbotron>
          <h1>Imóveis</h1>
            <Button 
              onClick={this.onNovoImovelClick.bind(this)}>
              Novo Imóvel
            </Button>
        </Jumbotron>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6} mdOffset={3}>
        <Table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.store.imoveis.map(i => (
              <tr key={i._id}>
                <td>
                  {i.titulo}
                </td>
                <td>
                  <Link to={'/admin/imovel/'+i._id}>
                  <Button>
                    <Glyphicon glyph="edit" />
                  </Button>
                </Link>
                </td>


              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>

        <Modal show={this.uiStore.showModal} onHide={() => this.uiStore.showModal = false}>
          <Modal.Header closeButton>
            <Modal.Title>Novo Imóvel</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            
            <Input
              label="Titulo do Imóvel"
              onChange={this.onTituloChange.bind(this)}
              validationMessage="Titulo invalido"
              value={this.store.titulo}
              validationFunction={validator.isAlphaNumeric}
            />

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.store.showModal = false}>Cancelar</Button>
            <Button onClick={this.onTituloSubmit.bind(this)}bsStyle="primary">Salvar</Button>
          </Modal.Footer>

        </Modal>
      </div>

    )
  }

  onNovoImovelClick() {
    this.uiStore.showModal = true

  }

  onTituloChange(e) {
    this.store.titulo = e.target.value
  }

  onTituloSubmit() {
    this.store.saveImovel()
  }
}
