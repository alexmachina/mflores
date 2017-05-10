import React from 'react'
import { Col, Row, Table, Glyphicon, Pagination } from 'react-bootstrap'
import SearchField from '../../utils/SearchField.jsx'

const ImoveisTable = ({
  items,
  activePage,
  onSelect,
  search,
  OnEditClick,
  handleSearchChange,
  imoveis

}) => (
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
        value={search}
        handleSearchChange={handleSearchChange}
      />
    </Col>
    <Col xs={12}>
      <Table hover striped>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {imoveis.map(imovel => (
          <tr>
            <td>{imovel.titulo}</td>
            <td>
              <button className="btn btn-primary" onClick={() => onEditClick(imovel._id)}>
              <Glyphicon glyph="edit"  />
            </button>
            </td>
          </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
  )

export default ImoveisTable
