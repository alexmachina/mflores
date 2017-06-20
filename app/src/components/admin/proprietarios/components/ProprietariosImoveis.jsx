import React from 'react'
import {Col, Glyphicon, Pagination, Jumbotron, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router'
import Loader from 'react-loader'

const ProprietariosImoveis = ({nome, imoveis, pagination, error_message, loaded}) => (
  <div>
    <Jumbotron className="admin-jumbotron text-center">
      <h1>Proprietário: {nome}</h1>
    </Jumbotron>

    <Loader loaded={loaded}>
      <div className="container">
        <Col xs={12} md={6}>
          <Pagination
            items={pagination.items}
            activePage={pagination.activePage}
            onSelect={pagination.onSelect}
          />
        </Col>

        <Col xs={12} md={6} className="error">
          {error_message}
        </Col>
        <Col xs={12}>
          <h1 className="text-center">
            Imóveis
          </h1>
        </Col>
        <Table hover striped>

          <thead>
            <th>Imóvel</th>
            <th>Opções</th>
          </thead>
          <tbody>
            {imoveis.map(i => (
              <tr>
                <td>{i.titulo}</td>
                <td>
                  <Link to={`/admin/imovel/${i._id}`}>
                    <Button>
                      <Glyphicon glyph="edit" />
                    </Button>
                  </Link>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </Loader>

</div>

)

export default ProprietariosImoveis
