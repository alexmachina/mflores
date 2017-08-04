import React from 'react'
import {Pagination, Table, Row, Col, Button, Glyphicon} from 'react-bootstrap'
import { observer } from 'mobx-react'
import moment from 'moment'
import Input from '../../../../utils/Input.jsx'
import Select from '../../../../utils/Select.jsx'
import DatePicker from 'react-datepicker'
import formatToReal from '../../../../utils/formatToReal.js'

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
            Nova Despesa
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
 <Col xs={12} md={6}>
          <Pagination
            bsSize="medium"
            items={this.props.items}
            onSelect={this.props.onSelect}
            activePage={this.props.activePage}
          />
        </Col>
        <Table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data de Pagamento</th>
              <th>Data de Vencimento</th>
              <th>Valor</th>
              <th>Observação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.props.despesas.map(d => (
              <tr key={d._id}>
                <td>{d.descricao}</td>
                <td>{d.data ? moment(d.data).format('DD/MM/YYYY') : ''}</td>
                <td>{d.dataVencimento ? moment(d.dataVencimento).format('DD/MM/YYYY') : ''}</td>
                <td>{formatToReal(d.valor)}</td>
                <td>{d.observacao}</td>
                <td>
                  <Button onClick={() => {
                    d.data = d.data ? moment(d.data) : null
                    d.dataVencimento = d.dataVencimento ? moment(d.dataVencimento) : null
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
          <span>Total mensal:{formatToReal(this.props.totalDespesas)}</span>
      </Row>
      </div>)
  }
}
