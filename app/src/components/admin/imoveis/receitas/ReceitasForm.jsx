import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import Input from '../../../utils/Input.jsx'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import CurrencyInput from 'react-currency-input'

@observer
export default class ReceitasForm extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col xs={12}>
            <form onSubmit={this.props.onSubmit}>
              <Input label="Descrição"
                onChange={this.props.onDescricaoChange}
                value={this.props.selectedReceita.descricao}
              />
              <label>Valor</label>
              <CurrencyInput 
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                className="form-control"
                value={this.props.selectedReceita.valor}
                onChange={this.props.onValorChange}
              />
              <label>Data</label>
              <DatePicker 
                selected={this.props.selectedReceita.data}
                onChange={this.props.onDataChange}
                className="date-picker form-control"
              />

            <Input label="Observação"
              onChange={this.props.onObservacaoChange}
              value={this.props.selectedReceita.observacao}
            />
            <Input label="Modo de Pagamento"
              onChange={this.props.onModoPagamentoChange}
              value={this.props.selectedReceita.modoPagamento}
            />

          <Button className="save-button" type="submit">
            Salvar
          </Button>
          {this.props.selectedReceita._id ? (
          <Button
            className="btn btn-danger delete-button" 
            onClick={this.props.onDeleteClick}
          >
            Deletar
          </Button>
          ) : <p></p>}
        </form>
      </Col>

    </Row>
  </div>
  )
  }
  }
