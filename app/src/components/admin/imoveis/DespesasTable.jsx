import React from 'react'
  import {Table, Row, Col, Button, Glyphicon} from 'react-bootstrap'
import { observer } from 'mobx-react'
import moment from 'moment'

export default class DespesasTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Button 
          className="table-button"
          bsStyle="primary" onClick={this.props.onNewClick}>
          Adicionar Despesa
        </Button>
        <Table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.props.despesas.map(d => (
              <tr>
                <td>{d.descricao}</td>
                <td>{moment(d.data).format('DD/MM/YYYY')}</td>
                <td>{d.valor}</td>
                <td>
                  <Button onClick={() => {
                    d.data = moment(d.data)
                    this.props.onEditClick(d)
                  }}>
                  <Glyphicon glyph="edit" />
                </Button>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </div>)
  }
}
