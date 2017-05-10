import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Input from '../../../utils/Input.jsx'
import DatePicker from 'react-datepicker'

export default class RelatorioImovelForm extends React.Component {
constructor(props) {
super(props)
}

render() {
<div>
  <form onSubmit={this.props.onSubmit} >
    <label>Data Inicial</label>
    <DatePicker selected={this.props.params.dataInicial}
      onChange={this.props.onDataInicialChange}
      className="date-picker"
    />

  <label>Data Final</label>
  <DatePicker selected={this.props.params.dataFinal}
    onChange={this.props.onDataFinalChange}
    className="date-picker" />

  <Button bsSize="lg" type="submit">
    Extrair Relatório
  </Button>
</form>

    </div>

}
}
