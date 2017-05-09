import React from 'react'
import {Glyphicon, Row, Col, Button, Table} from 'react-bootstrap'
import { observer } from 'mobx-react'
import Input from '../../../utils/Input.jsx'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import formatToReal from '../../../utils/formatToReal.js'

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
        </Row>
        <Row>
          <Col xs={12}>
            <Table hover>
              <thead>
                <tr>
                  <td>Descrição</td>
                  <td>Valor</td>
                  <td>Data</td>
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
            <span>Total: {Intl.NumberFormat('pt-BR').format(this.props.totalReceitas)} </span>
          </Col>
        </Row>
      </div>
        
    )
  }
}
