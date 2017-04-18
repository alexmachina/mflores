import React from 'react'
import {Pagination, Modal, Row, Jumbotron, Col, Button, Table, Glyphicon} from 'react-bootstrap'
import { Link } from 'react-router'
import uiStore from '../../../stores/admin/uiStore.js'
import ImoveisStore from '../../../stores/admin/imoveisStore.js'
import {observer} from 'mobx-react'
import Input from '../../utils/Input.jsx'
import SearchField from '../../utils/SearchField.jsx'
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
        <Jumbotron className="text-center admin-jumbotron">
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
        <Col xs={12} md={6}>
        <Pagination
          prev
          next
          ellipsis
          boundaryLinks
          items={this.store.items}
          maxButtons={5}
          activePage={this.store.activePage}
          onSelect={(e) => {
            this.store.activePage = e
            this.store.getImoveis()
          }} />
      </Col>
      <Col xs={12} md={6}>
        <SearchField search={this.store.search}
          handleSearchChange={(e) => {
            this.store.search = e.target.value
            this.store.getImoveis()
          }} />
      </Col>
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
          validationFunction={(e) => {
            if(e) {
              return true
            }
            else{
              return false
            }
          }}
          ref="tituloInput"
        />

    </Modal.Body>

    <Modal.Footer>
      <Button onClick={() => this.uiStore.showModal = false}>Cancelar</Button>
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
    if(this.store.titulo) {
      this.store.saveImovel()
    } else {
      this.refs.tituloInput.onBlur()
    }
  }
}
