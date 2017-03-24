import React from 'react'
import LocatarioFormStore from '../../../stores/admin/locatarioFormStore'
import Input from '../../utils/Input.jsx'
import {Row, Col, Button} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
  import moment from 'moment'
import {observer} from 'mobx-react'
moment.locale('pt-BR')

@observer
  export default class LocatarioForm extends React.Component {
    constructor(props) {
      super(props)
      this.store = new LocatarioFormStore()
    }
    componentDidMount() {
      this.store.getLocatario(this.props.id)
    }
    render() {
      return(
        <div className="container-fluid">
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              <form onSubmit={this.onSubmit.bind(this)}>
                <Input label="CPF/CNPJ"
                  value={this.store.locatario.cpfCnpj}
                  onChange={this.onCpfCnpjChange.bind(this)}
                />
                <Input label="RG/Inscrição"
                  value={this.store.locatario.rgInscricao}
                  onChange={this.onRgInscricaoChange.bind(this)}
                />
                <Input label="Responsável"
                  value={this.store.locatario.responsavel}
                  onChange={this.onResponsavelChange.bind(this)}
                />
                <Input label="Telefone"
                  value={this.store.locatario.telefone}
                  onChange={this.onTelefoneChange.bind(this)}
                />
                <Input label="Celular"
                  value={this.store.locatario.celular}
                  onChange={this.onCelularChange.bind(this)}
                />
                <Input label="Email"
                  value={this.store.locatario.email}
                  onChange={this.onEmailChange.bind(this)}
                />
                <label>Data de Inicio do Contrato</label>
                <DatePicker 
                  className="date-picker"
                  selected={this.store.locatario.dataInicioContrato}
                  onChange={this.onDataInicioContratoChange.bind(this)}
                />
                <label>Data do Fim do Contrato</label>
                <DatePicker
                    className="date-picker"
                  selected={this.store.locatario.dataFimContrato}
                  onChange={this.onDataFimContratoChange.bind(this)}
                />
                
                <Input label="Valor(em reais)"
                  value={this.store.locatario.valor}
                  onChange={this.onValorChange.bind(this)}
                />
                <label>Seguro?</label>
                <input
                  className="form-control"
                  type="checkbox"
                  checked={this.store.locatario.seguro}
                  onChange={this.onSeguroChange.bind(this)}
                />
                <br />
                <label>Data de vencimento do seguro</label>
                <DatePicker
                  className="date-picker"
                  selected={this.store.locatario.dataVencimentoSeguro}
                  onChange={this.onDataVencimentoSeguroChange.bind(this)}
                 />

                <Button type="submit" className="save-button">
                  Salvar
                </Button>
            </form>
          </Col>
        </Row>
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault()
      this.store.saveLocatario(this.props.id)
  }

  onCpfCnpjChange(e) {
    this.store.locatario.cpfCnpj = e.target.value
  }
  onRgInscricaoChange(e) {
    this.store.locatario.rgInscricao = e.target.value
  }
  onResponsavelChange(e) {
    this.store.locatario.responsavel = e.target.value
  }
  onTelefoneChange(e) {
    this.store.locatario.telefone = e.target.value
  }
  onCelularChange(e) {
    this.store.locatario.celular = e.target.value
  }
  onEmailChange(e) {
    this.store.locatario.email = e.target.value
  }
  onDataInicioContratoChange(e) {
    this.store.locatario.dataInicioContrato = e
  }
  onDataFimContratoChange(e) {
    this.store.locatario.dataFimContrato = e
  }
  onValorChange(e) {
    this.store.locatario.valor = e.target.value
  }
  onSeguroChange(e) {
    this.store.locatario.seguro = e.target.checked
  }
  onDataVencimentoSeguroChange(e) {
    this.store.locatario.dataVencimentoSeguro = e
  }
}
