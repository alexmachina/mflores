import React from 'react'
import { Col, Row, Jumbotron, Button, 
  Pagination, Glyphicon, Table} from 'react-bootstrap'
import SearchField from '../../utils/SearchField.jsx'
import Loader from 'react-loader'
import { Link } from 'react-router'
import { observer } from 'mobx-react'

@observer
export default class ProprietariosTable extends React.Component {
  render() {
    let items = this.props.items
    let activePage = this.props.activePage
    let onSelect = this.props.onSelect
    let proprietarios = this.props.proprietarios
    let search = this.props.search
    let handleSearchChange = this.props.handleSearchChange
    let loaded = this.props.loaded
    let error_message = this.props.error_message

    console.log(proprietarios)

    return (
      <div>
        <div className="container">
          <Row>
            <Col xs={12} md={6}>
              <Pagination 
                items={items}
                activePage={activePage}
                onSelect={onSelect}
              />
            </Col>
            <Col xs={12} md={6}>
              <SearchField
                handleSearchChange={handleSearchChange}
                search={search}
              />
              {error_message}
            </Col>
          </Row>
          <Row>
            <Loader loaded={loaded}>
              <Table hover>
                <thead>
                  <tr>
                    <th>Proprietário</th>
                    <th>Imóveis</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {proprietarios.map(proprietario => (
                    <tr>
                      <td>{proprietario.nome}</td>
                      <td>
                        <Link to={`/admin/proprietario/${proprietario._id}/imoveis`}>
                          Ver Imóveis
                        </Link>
                      </td>
                      <td>
                        <Link to={`/admin/proprietario/${proprietario._id}`}>
                          <Button>
                            <Glyphicon glyph="edit" />
                    </Button>
                  </Link>
                </td>
            </tr>))}
      </tbody>

    </Table>
  </Loader>
</Row>
        </div>
      </div>)


  }
}

