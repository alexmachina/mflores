import React from 'react'
import {Pagination, Glyphicon, Row, Col, Button, Table} from 'react-bootstrap'
import { observer } from 'mobx-react'
import Input from '../../../../utils/Input.jsx'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import formatToReal from '../../../../utils/formatToReal.js'

@observer
export default class ReceitasTable extends React.Component {
  render() {
    return(
      <div>
        <Row>
          <Col xs={12} md={6}>
            <Button 
              className="table-button" 
              onClick={this.props.onNovaReceitaClick}
              bsStyle="primary"
            >
              Nova Receita
            </Button>
          </Col>
          <Col xs={12} md={2} mdOffset={4} className="text-right">
            <form onSubmit={this.props.onSearchFormSubmit}>
              <label>De:</label>
              <DatePicker 
                selected={this.props.search.dataInicial}
                onChange={this.props.onDataInicialChange}
                className="date-picker form-control"
              />
              <label>Até:</label>
              <DatePicker
                selected={this.props.search.dataFinal}
                onChange={this.props.onDataFinalChange}
                className="date-picker form-control"
              />
              <Button className="table-button" type="submit">
                Filtrar
              </Button>
            </form>
          </Col>
          <Col xs={12} md={6}>
            <Pagination
              items={this.props.items}
              onSelect={this.props.onSelect}
              activePage={this.props.activePage}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table hover>
              <thead>
                <tr>
                  <td>Descrição</td>
                  <td>Valor</td>
                  <td>Data de Recebimento</td>
                  <td>Data de Vencimento</td>
                  <td>Observação</td>
                  <td>Modo de Pagamento</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {this.props.receitas.map(r => (
                  <tr key={r._id}>
                    <td>{r.descricao}</td>
                    <td>{formatToReal(r.valor)}</td>
                    <td>{moment(r.data).format('DD/MM/YYYY')}</td>
                    <td>{moment(r.dataVencimento).format('DD/MM/YYYY')}</td>
                    <td>{r.observacao}</td>
                    <td>{r.modoPagamento}</td>
                    <td>
                      <Button onClick={() => {this.props.onEditClick(r._id)}}>
                        <Glyphicon glyph="edit" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <span>Total a Receber:{formatToReal(this.props.totalAReceber)} </span>
            <br />
            <span>Total Recebido: {formatToReal(this.props.totalRecebido)}</span>
          </Col>
        </Row>
      </div>
        
    )
  }
}
