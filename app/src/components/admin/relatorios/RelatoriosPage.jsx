import React from 'react'
import { Link } from 'react-router'
import { Row, Jumbotron, Glyphicon, Button, Col } from 'react-bootstrap'
import '../styles/relatorios.scss'

export default () => (
  <div className="container-fluid">
    <Row>
      <Col xs={12} md={12}>
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Relatórios</h1>
        </Jumbotron>
        <Col xs={12} sm={6}>
          <Link to="/admin/relatorios/imoveis">
            <Button className="relatorio-button" bsSize="large" block>
              <Glyphicon glyph="list" /> Relatório de Imóvel
            </Button>
          </Link>
        </Col>
        <Col xs={12} sm={6}>
          <Link to="/admin/relatorios/controle">
            <Button className="relatorio-button" bsSize="large" block>
              <Glyphicon glyph="list" /> Relatório de Controle(Despesas e Receitas)
            </Button>
          </Link>
        </Col>
        <Col xs={12} sm={6}>
          <Link to="/admin/relatorios/locacao">
            <Button className="relatorio-button" bsSize="large" block>
              <Glyphicon glyph="list" /> Relatorio de Locação
            </Button>
          </Link>
        </Col>

      </Col>
    </Row>
  </div>
)
