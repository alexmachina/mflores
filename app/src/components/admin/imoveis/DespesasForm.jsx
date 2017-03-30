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
          <Input label="Mes"
            value={this.props.selectedDespesa.mes}
            onChange={this.props.onMesChange}
          />
          <Input label="Ano"
            value={this.props.selectedDespesa.ano}
            onChange={this.props.onAnoChange}
          />
          <Button className="save-button" type="submit">
            Salvar
          </Button>
        </form>
      </div>
    )
  }
}
