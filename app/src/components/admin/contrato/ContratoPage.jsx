import React from 'react'
import { Link } from 'react-router'
import {Row, Col, Button, Jumbotron} from 'react-bootstrap'

const ContratoPage = () => (
  <div>
    <Row>
      <Col xs={12}>
      <Jumbotron className="text-center admin-jumbotron">
        <h1>Contrato</h1>
      </Jumbotron>
      <Col xs={12} sm={6}>
        <Link to="/admin/contrato/modelos">
          <Button className="relatorio-button" bsSize="large" block>
            Modelos de Contrato
          </Button>
        </Link>
      </Col>
      <Col xs={12} sm={6}>
        <Link to="/admin/contrato/modelos">
          <Button className="relatorio-button" bsSize="large" block>
            Geração de Contrato
          </Button>
        </Link>
      </Col>
    </Col>
    </Row>
  </div>
)

export default ContratoPage
