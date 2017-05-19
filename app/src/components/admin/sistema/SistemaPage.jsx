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
      <Col xs={12} sm={4} id="opcao-usuarios" className="opcao-sistema">
        <a href="/#/admin/sistema/usuarios">
        <Button bsSize="large">
          <Glyphicon glyph="user" /> Usuários
        </Button>
      </a>
      </Col>
      <Col xs={12} sm={4} id="opcao-zoneamento" className="opcao-sistema">
        <a href="/#/admin/sistema/zoneamento">
          <Button bsSize="large">
            <Glyphicon glyph="th" /> Zoneamento
          </Button>
        </a>
      </Col>
      <Col xs={12} sm={4} className="opcao-sistema">
        <a href="/#/admin/sistema/tiposimoveis">
          <Button bsSize="large">
            <Glyphicon glyph="home" /> Tipos de Imóveis
          </Button>
        </a>
      </Col>
    </Row>
  </Col>
</div>
)


export default SistemaPage

