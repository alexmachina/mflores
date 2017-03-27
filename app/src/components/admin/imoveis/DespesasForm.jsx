import React from 'react'
import DespesasFormStore from '../../../stores/admin/despesasFormStore.js'
import Input from '../../utils/Input.jsx'
import DatePicker from 'react-datepicker'
import { observer } from 'mobx-react'
import {Row, Col, Button} from 'react-bootstrap'

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
          <Input label="Valor"
            value={this.props.selectedDespesa.valor}
            onChange={this.props.onValorChange}
          />
          <label>Data</label>
          <DatePicker 
            className="date-picker"
            selected={this.props.selectedDespesa.data}
            onChange={this.props.onDataChange}
          />
          <Button className="save-button" type="submit">
            Salvar
          </Button>
        </form>
      </div>
    )
  }
}
