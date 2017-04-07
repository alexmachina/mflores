import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import Input from '../../../utils/Input.jsx'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'

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
              <label>Data</label>
              <DatePicker 
                selected={this.props.selectedReceita.data}
                onChange={this.props.onDataChange}
                className="date-picker form-control"
              />
              <Input label="Valor"
                onChange={this.props.onValorChange}
                value={this.props.selectedReceita.valor}
              />

            <Input label="Observação"
              onChange={this.props.onObservacaoChange}
              value={this.props.selectedReceita.observacao}
            />

          <Button className="save-button" type="submit">
            Salvar
          </Button>
        </form>
      </Col>

    </Row>
  </div>
    )
  }
}
