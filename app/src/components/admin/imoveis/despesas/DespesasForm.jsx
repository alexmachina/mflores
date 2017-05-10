import React from 'react'
import Input from '../../../utils/Input.jsx'
import Select from '../../../utils/Select.jsx'
import DatePicker from 'react-datepicker'
import { observer } from 'mobx-react'
import {Row, Col, Button} from 'react-bootstrap'
import CurrencyInput from 'react-currency-input'

@observer
export default class DespesasForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <Input label="Descrição"
            value={this.props.selectedDespesa.descricao}
            onChange={this.props.onDescricaoChange}
          />
          <label>Valor</label>
          <CurrencyInput
            prefix="R$"
            decimalSeparator=","
            thousandSeparator="."
            className="form-control"
            value={this.props.selectedDespesa.valor}
            onChange={this.props.onValorChange}
          />
          <label>Data</label>
          <DatePicker selected={this.props.selectedDespesa.data}
            onChange={this.props.onDataChange}
            className="date-picker"
          />
          <Input label="Observação" 
            onChange={this.props.onObservacaoChange}
            value={this.props.selectedDespesa.observacao}
          />
          <Button className="save-button" type="submit">
            Salvar
          </Button>
        </form>
      </div>
    )
  }
}
