import React from 'react'
  import {Table, Row, Col, Button, Glyphicon} from 'react-bootstrap'
import { observer } from 'mobx-react'
import moment from 'moment'
import Input from '../../utils/Input.jsx'
import Select from '../../utils/Select.jsx'
import DatePicker from 'react-datepicker'
import formatToReal from '../../utils/formatToReal.js'

export default class DespesasTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Col xs={12} md={6}>
          <Button 
            className="table-button"
            bsStyle="primary" onClick={this.props.onNewClick}>
            Adicionar Despesa
          </Button>
        </Col>
        <Col xs={12} md={2} mdOffset={4} className="text-right">
          <form onSubmit={this.props.onSearchFormSubmit}>
            <label>De</label>
            <DatePicker selected={this.props.dataInicial}
              onChange={this.props.onDataInicialChange} />
            <label>Até</label>
            <DatePicker selected={this.props.dataFinal}
              onChange={this.props.onDataFinalChange} />
            <Button type="submit">
              Filtrar
            </Button>
          </form>
        </Col>
        <Table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Mes/Ano</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.props.despesas.map(d => (
              <tr key={d._id}>
                <td>{d.descricao}</td>
                <td>{moment(d.data).format('DD/MM/YYYY')}</td>
                <td>{formatToReal(d.valor)}</td>
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
        <Row>
          <span>Total mensal: {Intl.NumberFormat('pt-BR').format(this.props.totalDespesas)}</span>
      </Row>
      </div>)
  }
}
