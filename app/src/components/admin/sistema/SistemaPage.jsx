import React from 'react'
import {Row, Col, Button, Glyphicon, Jumbotron} from 'react-bootstrap'
import './css/sistema.css'

const SistemaPage = () => (
  <div>
  <Col className="container-fluid">
    <Jumbotron className="admin-jumbotron text-center">
      <h1>Sistema</h1>
    </Jumbotron>
    <Row className="sistema">
      <Col xs={12} sm={6} id="opcao-usuarios" className="opcao-sistema">
        <a href="/#/admin/sistema/usuarios">
          <Button bsSize="large">
            <Glyphicon glyph="user" /> Usuários
          </Button>
        </a>
      </Col>
    </Row>
  </Col>
  </div>
)


export default SistemaPage

