import React from 'react'
import { Table } from 'react-bootstrap'

const UsuariosTable = ({usuarios, onCellClick}) => (
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

          <td>{u.username}</td>
          <td>{u.fullName}</td>
          <td>{u.email}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default UsuariosTable
