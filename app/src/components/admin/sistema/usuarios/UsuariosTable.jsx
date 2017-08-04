import React from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router'

const UsuariosTable = ({usuarios, onCellClick, onNewItemClick}) => (
    <div className="container">
      <Row>
        <Col xs={12} md={12}>
          <Button bsStyle="primary" onClick={onNewItemClick}>
            Novo Item
          </Button>
        </Col>
      </Row>
      <Table hover striped>
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(u => (
          <tr 
            onClick={() => onCellClick(u)}
            key={u._id}
          >
            <td><Link to={`/admin/usuario/${u.username}`}>{u.username}</Link></td>
            <td>{u.fullname}</td>
            <td>{u.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default UsuariosTable
