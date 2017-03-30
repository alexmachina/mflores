import React from 'react'
import DespesasFormStore from '../../../stores/admin/despesasFormStore.js'
import Input from '../../utils/Input.jsx'
import Select from '../../utils/Select.jsx'
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
          <Select 
            onChange={this.props.onMesChange}
            value={this.props.selectedDespesa.mes}
            options={[
              {option: 'Janeiro', value:1},
              {option: 'Fevereiro', value:2},
              {option: 'Março', value: 3},
              {option: 'Abril', value: 4},
              {option: 'Maio', value:5},
              {option: 'Junho', value:6},
              {option: 'Julho', value:7},
              {option: 'Agosto', value:8},
              {option: 'Setembro', value: 9},
              {option: 'Outubro', value: 10},
              {option: 'Novembro', value: 11},
              {option: 'Dezembro', value: 12}
            ]
            } />

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
