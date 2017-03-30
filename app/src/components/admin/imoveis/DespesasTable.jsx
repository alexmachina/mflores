import React from 'react'
  import {Table, Row, Col, Button, Glyphicon} from 'react-bootstrap'
import { observer } from 'mobx-react'
import moment from 'moment'
import Input from '../../utils/Input.jsx'
import Select from '../../utils/Select.jsx'

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
            <Select 
              onChange={this.props.onMesChange.bind(this)}
              value={this.props.mes}
              options={[
                {option: 'Janeiro', value:'01'},
                {option: 'Fevereiro', value:'02'},
                {option: 'Março', value: '03'},
                {option: 'Abril', value: '04'},
                {option: 'Maio', value:'05'},
                {option: 'Junho', value:'06'},
                {option: 'Julho', value:'07'},
                {option: 'Agosto', value:'08'},
                {option: 'Setembro', value: '09'},
                {option: 'Outubro', value: '10'},
                {option: 'Novembro', value: '11'},
                {option: 'Dezembro', value: '12'}
              ]
              }
            />
           
          <Input
            label="Ano"
            onChange={this.props.onAnoChange} 
            value={this.props.ano}
          />
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
            <tr>
              <td>{d.descricao}</td>
              <td>{d.mes}/{d.ano}</td>
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
      <Row>
        <span>Total mensal: {this.props.totalDespesas}</span>
      </Row>
    </div>)
  }
}
